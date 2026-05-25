
// API Errors

export class ApiError extends Error {
    name = 'ApiError';
}

export class ApiRequestParamError extends ApiError {
    name = 'ApiRequestParamError';
    param;

    constructor(message, param) {
        super(message ? message : `API: Unable to send the request: Param '${param}': Unknown Error`);
        if (param) this.param = param;
    }
}

export class ApiRequestParamDataError extends ApiRequestParamError {
    name = 'ApiRequestParamDataError';
    data;

    constructor(message, param, data) {
        super(message ? message : `API: Unable to send the request: The data in param '${param}' is invalid (${data})`, param);
        if (data) this.data = data;
    }
}

export class ApiRequestNoParamError extends ApiRequestParamError {
    name = 'ApiRequestNoParamError';

    constructor(message, param) {
        super(message ? message : `API: Unable to send the request: Param '${param}' is not set`, param);
    }
}


// Field Errors

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
        super(message ? message : `Field '${field}': The data is invalid ('${data}')`, field);
        if (data) this.data = data;
    }
}

export class FieldNoDataError extends FieldError {
    name = 'FieldNoDataError';

    constructor(message, field) {
        super(message ? message : `Field '${field}': No data`, field);
    }
}
