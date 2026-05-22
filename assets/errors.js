
export class ApiError extends Error {
    name = 'ApiError';
}

export class ApiRequestNoParamError extends ApiError {
    name = 'ApiRequestNoParamError';
    param;

    constructor(message, param) {
        super(message ? message : `API: Unable to send the request: Param '${param}' is not set`);
        if (param) this.param = param;
    }
}

export class FieldError extends Error {
    name = 'FieldError';
    field;

    constructor(message, field) {
        super(message ? message : `Field '${field}': Unknown Error`);
        if (field) this.field = field;
    }
}

export class FieldDataError extends FieldError {
    name = 'FieldDataError';
    data;

    constructor(message, field, data) {
        super(message ? message : `Field '${field}': The data is invalid ('${data}')`);
        if (field) this.field = field;
        if (data) this.data = data;
    }
}

export class FieldNoDataError extends FieldError {
    name = 'FieldNoDataError';

    constructor(message, field) {
        super(message ? message : `Field '${field}': No data`);
        if (field) this.field = field;
    }
}
