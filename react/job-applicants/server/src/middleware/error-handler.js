function handleError(err, req, res, next) {
    console.error(err);

    const status = err.status || 500;
    const message = 'something went wrong'
    res.status(status).json({ message: message });
}

export default handleError;

// Common things added to the error handler:

// **1. Error type differentiation**
// ```js
// export const errorHandler = (err, req, res, next) => {
//   // mysql2 errors
//   if (err.code === 'ER_DUP_ENTRY') {
//     return res.status(409).json({ message: 'Duplicate entry' })
//   }
//   // your custom errors
//   if (err.statusCode) {
//     return res.status(err.statusCode).json({ message: err.message })
//   }
//   // everything else
//   res.status(500).json({ message: 'Something went wrong' })
// }
// ```

// **2. Logging**
// ```js
// console.error(`[${new Date().toISOString()}] ${err.message}`)
// ```
// In production, this is replaced with a proper logger like `winston` or `pino`.

// **3. Hide internals in production**
// ```js
// const message = process.env.NODE_ENV === 'production'
//   ? 'Something went wrong'
//   : err.message
// ```

// **4. Stack trace in development**
// ```js
// res.status(status).json({
//   message,
//   ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
// })
// ```

// ---

// For `asyncHandler`, not much else is typically added — it's intentionally minimal. Its only job is catching and forwarding.

// For your project right now, #1 is the most immediately useful since you're already doing mysql2 duplicate detection.
