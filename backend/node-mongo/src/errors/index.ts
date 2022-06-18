abstract class HttpError extends Error {
    public statusCode!: number;
    public isLoggedIn?: boolean | null;
    public errorDetails?: any;
}

export class CustomError extends HttpError {
    constructor(message: string = "Custom message", statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class BadRequest extends HttpError {
    constructor(message: string = "Bad request", isLoggedIn?: boolean, errorDetails?: any) {
        super(message);
        this.statusCode = 400;
        if(isLoggedIn !== null) {
            this.isLoggedIn = isLoggedIn;
        }
        if(errorDetails !== null) {
            this.errorDetails = errorDetails;
        }
    }
}
export class Unauthorized extends HttpError {
    constructor(message: string = "Unauthorized", isLoggedIn?: boolean) {
        super(message);
        this.statusCode = 401;
        if(isLoggedIn !== null) {
            this.isLoggedIn = isLoggedIn;
        }
    }
}

export class Forbidden extends HttpError {
    constructor(message: string = "Forbidden") {
        super(message);
        this.statusCode = 403;
    }
}

export class NotFound extends HttpError {
    constructor(message: string = "Not found") {
        super(message);
        this.statusCode = 404;
    }
}
export class Conflict extends HttpError {
    constructor(message: string = "Resourse already exists") {
        super(message);
        this.statusCode = 409;
    }
}

export class InternalError extends HttpError {
    constructor(message: string = "Internal server error") {
        super(message);
        this.statusCode = 500;
    }
}

export interface ServerError {
    message: string;
    statusCode: number;
}