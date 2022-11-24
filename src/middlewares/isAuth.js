const isAuth = (password) => (req, res, next) => {
    const auth = req.headers.auth;

    if (auth !== password) {
        return res.send(401, 'Access forbidden');
    }

    next();
}

export default isAuth;