const CORE_TYPES = {
	CONFIG: Symbol.for('CONFIG'),
	LOGGER: Symbol.for('LOGGER')
};

const FILE_TYPES = {
	FILE_CONTROLLER: Symbol.for('FILE_CONTROLLER'),
	FILE_SERVICE: Symbol.for('FILE_SERVICE')
};

export const TYPES = {
	...CORE_TYPES,
	...FILE_TYPES
};
