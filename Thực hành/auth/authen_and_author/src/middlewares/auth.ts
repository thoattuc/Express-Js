import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        let accessToken = await req.body["access_token"];
        console.log('>>>accessToken', accessToken);
        console.log('>>>req.body', req.body);
        if (accessToken) {
            jwt.verify(accessToken, "SECRET", (err, decoded) => {
                if(err) {
                    return res.status(400).json({
                        message: err.message,
                        status: 401,
                    })
                }else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            return res.status(400).json({
                message: "No token provided.",
                status: 401,
            })
        }

    }catch (error) {
        return res.status(400).json({
            message: error.message,
            status: 401,
        })
    }
}