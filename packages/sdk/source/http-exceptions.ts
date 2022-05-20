import { Response } from "./http-response.js";

export class Exception extends Error {
	public constructor(message: string) {
		super(message);

		Object.defineProperty(this, "message", {
			enumerable: false,
			value: message,
		});

		Object.defineProperty(this, "name", {
			enumerable: false,
			value: this.constructor.name,
		});

		Error.captureStackTrace(this, this.constructor);
	}
}

export class RequestException extends Error {
	public constructor(response: Response, error?: Error) {
		const message = error
			? `HTTP request returned status code ${response.status()}: ${(error as any).message}`
			: `HTTP request returned status code ${response.status()}.`;

		super(message);

		Object.defineProperty(this, "message", {
			enumerable: false,
			value: message,
		});

		Object.defineProperty(this, "name", {
			enumerable: false,
			value: this.constructor.name,
		});

		Object.defineProperty(this, "response", {
			enumerable: false,
			value: response,
		});

		Error.captureStackTrace(this, this.constructor);
	}
}

export class BadResponseException extends Exception {
	public constructor(code: string) {
		super(`Bad Response: ${code}`);
	}
}
