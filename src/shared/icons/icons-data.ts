const iconsUrlData = {
	// TODO сделать автосорт по алфавиту
	search: '/img/icons/search-sm.svg',
	chevronDown: '/img/icons/chevron-down.svg',
	helpCircle: '/img/icons/help-circle.svg',
	chest: '/img/icons/chest.svg',
	pointerLi: '/img/icons/pointer-li.svg',
	fileIcon: '/img/icons/file-icon-04.svg',
	eyeOff: '/img/icons/eye-off.svg',
	eyeOn: '/img/icons/eye-on.svg',

	// SkyLogo: '/img/brand/Logo.svg',
	SkyLogo: '/img/brand/Logo.png',
	sortArrows: '/img/icons/sort-arrows.svg',
};

export type MyIconName = keyof typeof iconsUrlData;

function findDuplicateValues<T extends Record<string, unknown>>(obj: T): Array<keyof T> {
	const hashMap = new Map<unknown, boolean>();
	const duplicateKeys: Array<keyof T> = [];
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const value = obj[key];
			if (hashMap.has(value)) {
				duplicateKeys.push(key);
			} else {
				hashMap.set(value, true);
			}
		}
	}

	return duplicateKeys;
}

const valuesSet = new Set(Object.values(iconsUrlData));
if (valuesSet.size !== Object.keys(iconsUrlData).length) {
	console.warn('iconsUrlData duplicate', findDuplicateValues(iconsUrlData));
}

export const getIconUrlByName = (iconName: MyIconName): string => iconsUrlData[iconName];
