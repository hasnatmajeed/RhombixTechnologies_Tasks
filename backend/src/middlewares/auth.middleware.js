import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Not authorized, token missing"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Not authorized, invalid token"
        });
    }
};

export default protect;