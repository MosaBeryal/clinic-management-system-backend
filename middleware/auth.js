const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
    try {
        // Check if Authorization header is present
        const authorizationHeader = req.header("Authorization");
        if (!authorizationHeader) {
            return res.status(401).json({
                status: 0,
                msg: "Authorization header missing."
            });
        }

        // Split the Authorization header
        const tokenParts = authorizationHeader.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({
                status: 0,
                msg: "Invalid Authorization header format."
            });
        }

        console.log(process.env.JWT_SECRET_KEY)
        // Verify and decode JWT token
        jwt.verify(tokenParts[1], process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: 0,
                    msg: "Failed to authenticate token."
                });
            }
            // Token is valid, set user data on request object
            req.user = decoded;
            next();
        });
    } catch (e) {
        return res.status(500).json({
            status: 0,
            msg: "Internal server error."
        });
    }
};

module.exports  = authenticate
