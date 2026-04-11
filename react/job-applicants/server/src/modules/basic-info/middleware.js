import { validationResult } from "express-validator";

function validateRequest(req, res, next) { //TODO: can error handling in this be centralized?
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

export { validateRequest };
