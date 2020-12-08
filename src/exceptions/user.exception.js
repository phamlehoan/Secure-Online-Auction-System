class UserNotVerifyException extends Error {
    constructor(message) {
      super(message)
    }
}

class UserNotFoundException extends Error {
    constructor(message) {
      super(message)
    }
}

class NotHavePermissionException extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = {
    UserNotVerifyException,
    UserNotFoundException,
    NotHavePermissionException
}
