const jwt = require('jsonwebtoken');
const S = process.env.JWT_SECRET, E = process.env.JWT_EXPIRES_IN || '30d';
module.exports = {
    sign:    (p) => jwt.sign(p, S, { expiresIn: E }),
    verify:  (t) => { try { return jwt.verify(t, S); } catch { return null; } },
    extract: (req) => { const a = req.headers.authorization; return a?.startsWith('Bearer ') ? a.slice(7) : null; },
};
