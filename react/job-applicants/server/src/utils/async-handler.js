function handleAsync(fxn) {
    return async (req, res, next) => {
        try {
            await fxn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

export default handleAsync;
