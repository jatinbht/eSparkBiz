import { validationResult } from "express-validator";

function validateRequestExpressValidator(req, res, next) {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        const errorMap = result.array().reduce((acc, error) => {
            if (!acc[error.path]) {
                acc[error.path] = [];
            }
            acc[error.path].push(`${error.msg} ${error.value}`);
            return acc;
        }, {});

        return res.json(errorMap);
    }

    next();
}

// server/src/middleware/request-validator.js
function validateRequestZod(schema, validationTarget: 'body' | 'query') {
    return (req, res, next) => {
        // .safeParse() returns { success, data, error } instead of throwing
        const result = schema.parse(req[validationTarget]);

        // if (!result.success) {
        //     // result.error.flatten() gives you { fieldErrors: { field: ['message'] } }
        //     // which is already the shape you were manually building with .reduce()
        //     return res.status(400).json(result.error.flatten().fieldErrors);
        // }

        // result.data is the parsed AND sanitized data — Zod strips unknown fields
        // and applies transformations (trim, toLowerCase) automatically
        res.locals[validationTarget] = result;
        next();
    };
}

export { validateRequestZod, validateRequestExpressValidator};
