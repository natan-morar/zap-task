const isValidModel = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.validateAsync(req.body);

        next();
    } catch (error) {
        if (error.isJoi) {
            return res.json(400, { message: error.message })
        }

        return res.json(500, { message: error.message });
    }
}

export default isValidModel;