// class AppError extends Error {
//   constructor(message, statusCode, cause) {
//     super(message, { cause })
//     this.statusCode = statusCode
//   }
// }

// // usage
// throw new AppError('Applicant not found', 404, originalErr)

// // src/utils/AppError.js
// class AppError extends Error {
//   constructor(message, statusCode) {
//     super(message)
//     this.statusCode = statusCode
//   }
// }

// export default AppError

class AppError extends Error {
    constructor(message, code, cause) {
        super(message, { cause });
        this.status = code || 500
    }
}

export default AppError