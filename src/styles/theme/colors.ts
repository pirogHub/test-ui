const LightColors = {
	// Text & Icons
	text1: 'rgba(35, 31, 35, 1)',
	text2: 'rgba(27, 31, 59, 0.8)', // color for text in filter
	text3: 'rgba(27, 31, 59, 0.65)', // secondary color for text
	text4: 'rgba(27, 31, 59, 0.4)',
	icon1: 'rgba(71, 72, 79, 1)',
	icon2: 'rgba(164, 165, 177, 1)',
	// Base
	base1: 'rgba(255, 255, 255, 1)', // modals
	base2: 'rgba(249, 250, 252, 1)', // main page color
	base3: 'rgba(216, 218, 224, 1)', // secondary color
	base4: 'rgba(234, 234, 234, 1)', // border color
	base5: 'rgba(248, 248, 248, 1)', // row hover
	base6: 'rgba(236, 239, 244, 1)',
	base7: 'rgba(245, 245, 245, 1)',
	primary1: 'rgba(46, 172, 251, 1)',
	primary04Active: 'rgba(46, 172, 251, 0.4)',
	backgroundAccent: 'rgba(234, 247, 255, 1)', // buttons color
	backgroundAccent2Hover: 'rgba(88, 191, 255, 1)', // buttons hover color
	// System
	error: 'rgba(235, 85, 38, 1)',
	positive: 'rgba(76, 199, 89, 1)',
	// Status
	StatusBg1: 'rgba(235, 241, 253, 1)',
	StatusBg2: 'rgba(243, 232, 255, 1)',
	StatusBg3: 'rgba(218, 244, 203, 1)',
	StatusBg4: 'rgba(255, 249, 222, 1)',
	StatusBg5: 'rgba(255, 232, 228, 1)',
	StatusBg6: 'rgba(255, 239, 215, 1)',
	StatusBg7: 'rgba(245, 245, 245, 1)',
	StatusText1: 'rgba(32, 98, 241, 1)',
	StatusText2: 'rgba(125, 34, 206, 1)',
	StatusText3: 'rgba(65, 122, 71, 1)',
	StatusText4: 'rgb(242, 178, 0)',
	StatusText5: 'rgba(235, 85, 38, 1)', // as 'error'
	StatusText6: 'rgba(243, 155, 14, 1)',
	StatusText7: 'rgba(117, 117, 117, 1)',
};

export type SkyAllianceBaseColorsSchemaType = typeof LightColors;
export type SkyAllianceBaseColorsNamesType = keyof SkyAllianceBaseColorsSchemaType;

export const SkyAllianceBaseColors: Record<'light' | 'dark', SkyAllianceBaseColorsSchemaType> = {
	light: LightColors,
	dark: LightColors,
};

export const getThemedColor = (colorName: SkyAllianceBaseColorsNamesType, theme: 'light' | 'dark' = 'light'): string =>
	SkyAllianceBaseColors[theme][colorName];
