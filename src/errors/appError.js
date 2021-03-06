const { NOT_FOUND, FORBIDDEN, UNAUTHORIZED } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(entity, params, message) {
    super(
      message || `Couldn't find a(an) ${entity} with: ${JSON.stringify(params)}`
    );
    this.status = NOT_FOUND;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message || 'Wrong login/password combination');
    this.status = FORBIDDEN;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message || 'Unauthorized error');
    this.status = UNAUTHORIZED;
  }
}

module.exports = {
  NOT_FOUND_ERROR: NotFoundError,
  FORBIDDEN_ERROR: ForbiddenError,
  UNAUTHORIZED_ERROR: UnauthorizedError
};
