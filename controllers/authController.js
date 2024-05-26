const jwt = require('jsonwebtoken');
const User = require('../models').User;

exports.signIn = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        // Compare passwords
        // const isMatch = await bcrypt.compare(password, user.password);
        const isMatch = String(password) === user.password

        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }

        // Create and return JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            // process.env.JWT_SECRET,
            "Edsadasd",
            { expiresIn: "1h" },
            (err, token) => {
                if (err) throw err;
                res.json({ user: user, message: "Logged in!", token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};
