import React, {useState} from 'react';

import {Header} from '@/components/header';
import {ChevronLeft, ChevronRight} from '@mui/icons-material';
import {IconButton, Stack, SxProps, Typography, styled} from '@mui/material';
import {
	DateCalendar,
	ExportedPickersYearProps,
	PickersCalendarHeader,
	PickersCalendarHeaderProps,
	PickersDay,
	PickersDayProps,
	YearCalendarSlotProps,
} from '@mui/x-date-pickers';
import {LocalizationProvider} from '@mui/x-date-pickers';
import '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {PickersYearProps} from '@mui/x-date-pickers/YearCalendar/PickersYear';
import {SlotComponentPropsFromProps} from '@mui/x-date-pickers/internals';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
// Подключение русской локали
import updateLocale from 'dayjs/plugin/updateLocale';

import {Button, ButtonProps} from '@/shared/ui/button';

// Плагин для обновления локали
dayjs.extend(updateLocale);

// Переопределение локализации: месяцы с заглавной буквы и дни недели с двумя буквами
dayjs.updateLocale('ru', {
	months: [
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	],
	monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
	weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
	weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], // Отображение дней недели с 2 буквами
	weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], // Минимальные сокращения для дней недели
});

const Wrapper = styled('div')({
	border: '1px solid #EAEAEA',
	boxShadow: '0px 0px 16px 0px #2C2D2E14',
	borderRadius: '12px',
	display: 'inline-flex',
	alignItems: 'center',
	flexDirection: 'column',
	width: '338px',
});

// Стилизация календаря
const StyledStaticDatePicker = styled(DateCalendar)({
	'.MuiPickersCalendarHeader-root': {
		// display: 'flex',
		// alignItems: 'center',
		// justifyItems: 'center',
		position: 'relative',

		marginRight: '8px',
		// width: '100%',
	},
	'.MuiPickersCalendarHeader-labelContainer': {
		position: 'absolute',

		display: 'flex',
		alignItems: 'center',
		justifyItems: 'center',
		inset: 0,
	},
	'.MuiPickersCalendarHeader-switchViewButton': {
		display: 'none',
	},

	'.MuiPickersArrowSwitcher-root': {
		display: 'inline-flex',
		// visibility: "hidden"
	},
	'.MuiPickersCalendarHeader-label': {
		textAlign: 'center',
	},
	'.MuiPickersArrowSwitcher-spacer': {},
	// '.css-31ca4x-MuiPickersFadeTransitionGroup-root': {
	// 	display: 'flex',
	// 	position: 'absolute',
	// 	paddingLeft: '80px',
	// },
	'.MuiPickersArrowSwitcher-root ': {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
	},
	'.MuiPickersArrowSwitcher-button': {
		// paddingRight: '7px',
		color: '#2EACFB',
	},

	'.MuiPickersFadeTransitionGroup-root ': {
		marginInline: 'auto',
	},

	'.MuiPickersDay-root': {
		borderRadius: '8px',
	},
	'.MuiPickersDay-today': {
		border: 'none !important',
		position: 'relative',
	},
});

// Кастомный заголовок календаря
const CustomCalendarHeaderRoot = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	padding: '8px 16px',
	alignItems: 'center',
});
const CustomDay = (props: PickersDayProps<dayjs.Dayjs>) => {
	// console.log('t', t);
	const dayNum = props.day.day();

	const sx = {
		...(props.outsideCurrentMonth ? {opacity: 0.5} : {}),
		...(dayNum === 6 || dayNum === 0 ? {color: '#DD4C1E'} : {color: '#1B1F3BCC'}),
	};

	// const isSaturdayHighlighted = isSaturday(props.day);
	// const matchedStyles = isSaturdayHighlighted
	// 	? {backgroundColor: '#ffe8e8', color: 'black'} // Add your custom styles for highlighting Saturdays
	// 	: {};
	return (
		<PickersDay {...props} sx={{...props.sx, ...sx}} disableRipple>
			{props.day.format('D')}
			{props.today ? (
				<div
					style={{
						position: 'absolute',
						bottom: 1,
						left: 0,
						right: 0,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div style={{backgroundColor: '#1B1F3BCC', width: '12px', height: '2px', borderRadius: '6px'}} />
				</div>
			) : null}
		</PickersDay>
	);
};

const CustomYearButton = (
	props: PickersYearProps & {
		ownerState: PickersYearProps;
	},
) => {
	// React.useEffect(() => {
	// 	if (autoFocus || scrollerRef.current === null) {
	// 		return;
	// 	}
	// 	const tabbableButton = scrollerRef.current.querySelector<HTMLElement>('[tabindex="0"]');
	// 	if (!tabbableButton) {
	// 		return;
	// 	}

	// 	// Taken from useScroll in x-data-grid, but vertically centered
	// 	const offsetHeight = tabbableButton.offsetHeight;
	// 	const offsetTop = tabbableButton.offsetTop;

	// 	const clientHeight = scrollerRef.current.clientHeight;
	// 	const scrollTop = scrollerRef.current.scrollTop;

	// 	const elementBottom = offsetTop + offsetHeight;

	// 	if (offsetHeight > clientHeight || offsetTop < scrollTop) {
	// 		// Button already visible
	// 		return;
	// 	}

	// 	scrollerRef.current.scrollTop = elementBottom - clientHeight / 2 - offsetHeight / 2;
	// }, [autoFocus]);

	return (
		// <div {...props} className="MuiPickersYear-root">
		<Button
			{...(props as unknown as ButtonProps)}
			className="MuiPickersYear-root"
			variant="flatted"
			isActive={props.ownerState.selected}
			sx={{color: '#1B1F3BCC', fontWeight: '500 !important'}}
		>
			{props.ownerState.value}
			{props.ownerState.selected ? (
				<div
					style={{
						position: 'absolute',
						bottom: 1,
						left: 0,
						right: 0,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<div style={{backgroundColor: '#1B1F3BCC', width: '12px', height: '2px', borderRadius: '6px'}} />
				</div>
			) : null}
		</Button>
		// </div>
	);
};

const CustomCalendarHeader = (props: PickersCalendarHeaderProps<dayjs.Dayjs>) => {
	const {currentMonth, onMonthChange} = props;
	const handleToggleView = () => {
		if (props.views.length === 1 || !props.onViewChange || props.disabled) {
			return;
		}

		if (props.views.length === 2) {
			props.onViewChange(props.views.find((el) => el !== props.view) || props.views[0]);
		} else {
			// switching only between first 2

			const nextIndexToOpen = (props.views.indexOf(props.view) + 1) % props.views.length;
			// const nextIndexToOpen = props.views.indexOf(props.view) !== 0 ? 0 : 1;
			props.onViewChange(props.views[nextIndexToOpen]);
		}
	};

	const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'), 'left');
	// const selectNextYear = () => onMonthChange(currentMonth.add(1, 'year'), 'left');
	const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'), 'right');
	// const selectPreviousYear = () => onMonthChange(currentMonth.subtract(1, 'year'), 'right');
	// console.log(props);

	return (
		<CustomCalendarHeaderRoot {...props}>
			<Stack spacing={1} direction="row">
				<IconButton onClick={selectPreviousMonth} title="Previous month">
					<ChevronLeft htmlColor="#2EACFB" />
				</IconButton>
			</Stack>
			<Typography
				onClick={handleToggleView}
				variant="body2"
				sx={{
					display: 'flex',
					gap: '4px',
					cursor: 'pointer',
					fontWeight: '500',
				}}
			>
				<span>{currentMonth.locale('ru').format('MMMM')}</span>
				<span style={{color: '#2EACFB'}}>{currentMonth.format('YYYY')}</span>
			</Typography>
			<Stack spacing={1} direction="row">
				<IconButton onClick={selectNextMonth} title="Next month">
					<ChevronRight htmlColor="#2EACFB" />
				</IconButton>
			</Stack>
		</CustomCalendarHeaderRoot>
	);
};

const YearCalendarButton = styled('button', {
	name: 'MuiPickersYear',
	slot: 'YearButton',
	overridesResolver: (_, styles) => [styles.yearButton],
})<{ownerState: PickersYearProps}>(({theme}) => ({
	color: 'unset',
	backgroundColor: 'transparent',
	border: 0,
	outline: 0,
	...theme.typography.subtitle1,
	margin: '6px 0',
	height: 36,
	width: 72,
	borderRadius: 18,
	cursor: 'pointer',
}));

export const PageCalendar = () => {
	const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs());

	const setToday = () => {
		setValue(dayjs());
	};

	return (
		<>
			<Header />

			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '10px',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Wrapper>
					<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
						<StyledStaticDatePicker
							showDaysOutsideCurrentMonth
							fixedWeekNumber={6}
							slots={{
								calendarHeader: CustomCalendarHeader,
								day: CustomDay,
								yearButton: CustomYearButton,
							}}
							slotProps={{}}
							value={value}
							onChange={setValue}
							views={['year', 'month', 'day']}
						/>
					</LocalizationProvider>
					<div
						style={{
							color: '#2EACFB',
							height: '44px',
							boxShadow: '0px 1px 0px 0px #DDDFE0 inset',
							width: '100%',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Button onClick={setToday} sx={{width: '100%', padding: '0', height: '100%'}} label="Button" />
					</div>
				</Wrapper>
			</div>
		</>
	);
};

export default PageCalendar;
