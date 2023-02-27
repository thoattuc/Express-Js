import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        let access_token = req.body['access_token'];
        if (access_token) {
            jwt.verify(access_token, 'SECRET', (err, decoded) => {
                if (err) {
                    return res.status(400).json({
                        message: err.message,
                        status: 401,
                    });
                } else {
                    req.decode = decoded;
                    next();
                }
            },)
        } else {
            return res.status(400).json({
                message: 'No access token provided',
                status: 401,
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: err.message,
            status: 401
        });
    }
}