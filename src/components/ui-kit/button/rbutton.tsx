import React, { useMemo } from "react";

import { TextCss } from "@retext/shared/ui/text";

import { styled } from "@mui/material";

// import {xs} from '../../../components/common/common';
export const xs = "(max-width: 599px)";
// import {
//   theme,
//   themedColor,
//   themedColorString,
// } from "../../../components/design/theme";

export type ButtonView =
  | "primary"
  | "secondary"
  | "outline"
  | "promo"
  | "link"
  | "retext";

export type ButtonSize = "xs" | "s" | "m" | "xl" | "xll" | "xxl";

const styleByView: Record<ButtonView, string> = {
  primary: `
      ${themedColor("buttonsAccent", "background")};
      color: ${themedColorString("titlePrimary", "dark")};

      @media (hover: hover) {
        &:hover {
          ${themedColor("buttonsAccentHover", "background")};
        }
      }
      @media (hover: none) {
        &:active {
          ${themedColor("buttonsAccentHover", "background")};
        }
      }
    `,
  secondary: `
      ${themedColor("buttonsSecondary", "background")};
      ${themedColor("bodyPrimary")};

      @media (hover: hover) {
        &:hover {
          ${themedColor("buttonsHover", "background")};
          opacity: 0.9;
        }
      }
      @media (hover: none) {
        &:active {
          ${themedColor("buttonsHover", "background")};
          opacity: 0.9;
        }
      }
    `,
  outline: `
      ${themedColor("bodyPrimary")};
      ${themedColor("backgroundPrimary", "background")};
      ${themedColor("buttonsHover", "border", "1px solid")};

      @media (hover: hover) {
        &:hover {
          border-color: transparent;
          ${themedColor("buttonsHover", "background")};
        }
      }
      @media (hover: none) {
        &:active {
          border-color: transparent;
          ${themedColor("buttonsHover", "background")};
        }
      }
    `,
  promo: `
      ${themedColor("gradientButtonText")};
      ${themedColor("gradient", "background")};
      background-size: 150%;

      @media (hover: hover) {
        &:hover {
          ${themedColor("gradient", "background")};
          background-position-x: 50%;
          background-size: 150%;
          transition: .3s;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
        }
      }
      @media (hover: none) {
        &:active {
          ${themedColor("gradient", "background")};
          background-position-x: 50%;
          background-size: 150%;
          transition: .3s;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
        }
      }
    `,
  link: `
      ${themedColor("buttonsAccent")};
      &, &:hover {
        background-color: transparent;
      }
      &:active {
        transform: scale(0.96);
      }
    `,
  retext: `
    ${themedColor("bodyPrimary")};
      ${themedColor("backgroundPrimary", "background")};
      


    @media (hover: hover) {
      &:hover {
        ${themedColor("retext005", "background")};
      }
    }
    @media (hover: none) {
      &:active {
        ${themedColor("retext01", "background")};
      }
    }
    &:active {
      ${themedColor("retext01", "background")};
    }
  `,
};

const styleBySize: Record<ButtonSize, string> = {
  xs: `
      gap: 6px;
      font-size: 12px;
      line-height: 14px;
      padding: 4px 6px;
      border-radius: 4px;
    `,
  s: `
      gap: 8px;
      font-size: 14px;
      line-height: 16px;
      padding: 8px;
      border-radius: 6px;
    `,
  m: `
      gap: 10px;
      font-size: 14px;
      line-height: 16px;
      padding: 10px 16px;
      border-radius: 8px;
    `,
  xl: `
      gap: 12px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      padding: 12px 20px;
      border-radius: 10px;
    `,
  xll: `
      gap: 12px;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      padding: 12px 16px;
      border-radius: 8px;
    `,
  xxl: `
      gap: 12px;
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      padding: 16px 32px;
      border-radius: 10px;

      @media screen and ${xs} {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        padding: 12px 28px;
      }
    `,
};

const ContentContainer = styled("span")``;

const IconContainer = styled("span")`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface RootProps {
  view: ButtonView;
  size: ButtonSize;
  disableUnderline: boolean;
  styleOfDisable?: boolean;
}

const Root = styled("button", {
  shouldForwardProp: (propName) =>
    propName !== "view" &&
    propName !== "size" &&
    propName !== "sx" &&
    propName !== "disableUnderline" &&
    propName !== "as" &&
    propName !== "styleOfDisable",
})<RootProps>`
  ${TextCss};
  position: relative;
  font-weight: 400;
  transition-duration: 0.4s;

  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;

  box-sizing: border-box;
  width: fit-content;
  height: fit-content;

  ${(p) => styleByView[p.view]};
  ${(p) => styleBySize[p.size]};

  @media (hover: hover) {
    &:hover {
      ${(p) =>
        p.view === "link" &&
        !p.disableUnderline &&
        "text-decoration: underline"};
    }
  }
  @media (hover: none) {
    &:active {
      ${(p) =>
        p.view === "link" &&
        !p.disableUnderline &&
        "text-decoration: underline"};
    }
  }

  &[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  ${(p) =>
    p.styleOfDisable &&
    `opacity: 0.4;
      cursor: not-allowed;
      
      @media (hover: hover) {
        &:hover {
          opacity: 0.4;
      cursor: not-allowed;
        }
    }
    @media (hover: none) {
        &:active {
          opacity: 0.4;
          cursor: not-allowed;
        }
    }
      
      `};
`;

const Highlight = styled("div", {
  label: "Highlight",
  shouldForwardProp: (prop) => prop !== "click",
})<{ click?: boolean }>`
  position: absolute;
  width: 100%;
  left: 0;
  height: 100%;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.7);
  filter: blur(25px);
  transform: translate(-200%, 0px);
  transition: none;
  ${(p) =>
    p.click
      ? `
      transition: 700ms;
      transform: translate(200%, 0px);
    `
      : ``}
`;

interface ButtonProps
  extends Omit<
    React.ComponentProps<typeof Root>,
    Exclude<keyof RootProps, "sx">
  > {
  view?: ButtonView;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disableUnderline?: boolean;
  sxMobile?: React.ComponentProps<typeof Root>["sx"];
  contentContainerSx?: React.ComponentProps<typeof ContentContainer>["sx"];
  sxIconContainerLeft?: React.ComponentProps<typeof IconContainer>["sx"];
  sxIconContainerRight?: React.ComponentProps<typeof IconContainer>["sx"];
  styleOfDisable?: boolean;

  /**
   * Enables highlight
   * - `undefined` - No highlight
   * - `true` - Show Highlight
   * - `false` - Highlight is hidden
   */
  enableHighlight?: boolean;
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(
  (
    {
      view = "primary",
      size = "m",
      leftIcon,
      rightIcon,
      onClick,
      sx,
      sxMobile,
      disableUnderline = false,
      children,
      className,
      enableHighlight = undefined,
      contentContainerSx,
      sxIconContainerLeft,
      sxIconContainerRight,
      ...props
    },
    ref
  ) => {
    const finalClassName = useMemo(
      () => [className, "RetextButton"].filter(Boolean).join(" "),
      [className]
    );

    return (
      <Root
        {...(props?.styleOfDisable ? { "data-style-disabled": "true" } : {})}
        className={finalClassName}
        ref={ref}
        view={view}
        size={size}
        onClick={onClick}
        sx={{
          ...sx,
          [theme.breakpoints.down("sm")]: { ...sx, ...sxMobile },
          overflow: enableHighlight !== undefined ? "hidden" : undefined,
        }}
        disableUnderline={disableUnderline}
        {...props}
      >
        {leftIcon !== undefined && (
          <IconContainer sx={sxIconContainerLeft}>{leftIcon}</IconContainer>
        )}
        {Boolean(children) && (
          <ContentContainer sx={contentContainerSx}>
            {children}
          </ContentContainer>
        )}
        {rightIcon !== undefined && (
          <IconContainer sx={sxIconContainerRight}>{rightIcon}</IconContainer>
        )}
        {enableHighlight !== undefined && <Highlight click={enableHighlight} />}
      </Root>
    );
  }
);
Button.displayName = "Button";

