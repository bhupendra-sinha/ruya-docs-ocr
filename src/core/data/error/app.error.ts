export class AppError extends Error {
	constructor(
		public statusCode: number,
		public code: string,
		message: string
	) {
		super(message);
		Object.setPrototypeOf(this, AppError.prototype);
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = 'Resource not found') {
		super(404, 'NOT_FOUND', message);
	}
}
