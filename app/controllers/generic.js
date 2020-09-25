exports.me = (req, res, next) => {
    res.send(req.auth)
}