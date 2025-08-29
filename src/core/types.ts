const CORE_TYPES = {
	CONFIG: Symbol.for('CONFIG'),
	LOGGER: Symbol.for('LOGGER'),
	OPENAI_CONFIG: Symbol.for('OPENAI_CONFIG')
};

const FILE_TYPES = {
	FILE_CONTROLLER: Symbol.for('FILE_CONTROLLER'),
	FILE_SERVICE: Symbol.for('FILE_SERVICE'),
	OCR_SERVICE: Symbol.for('OCR_SERVICE'),
	OPENAI_SERVICE: Symbol.for('OPENAI_SERVICE')
};

export const TYPES = {
	...CORE_TYPES,
	...FILE_TYPES
};
