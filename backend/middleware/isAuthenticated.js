import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if(!authorization) return res.status(401).json({ error: 'Token Not Found' });

        // Extract the jwt token from the request headers
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return res.status(401).json({ error: 'Unauthorized' });

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;