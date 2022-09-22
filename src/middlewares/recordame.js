let recordarme = (req, res, next) => {
    if (req.cookies.recordarme1 != undefined && req.session.user != undefined) {
        let file = resolve(__dirname, '../data', 'users.json')
        let data = read.FileSync(file, { encoding: 'utf8' });
        let user = JSON.parse(data);
        req.session.user = user.find(u => u.email === req.cookies.recordarme)
    }
    next();
}
    module.exports = recordame