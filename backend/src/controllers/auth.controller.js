import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


const registerUser = async (req, res) => {
    const { name, email, password } = req.body;


 
    // Validation check


    if (!name || !email || !password) {
    return res.status(400).json({
        message: "All fields are required"
    });
}


// Existing data check
const existingUser = await User.findOne({ email });

if (existingUser) {
    return res.status(400).json({
        message: "User already exists"
    });
}

// Hash password
const hashedPassword = await bcrypt.hash(password, 10);

//user create
const user = await User.create({
        name,
        email,
        password: hashedPassword
    });




    console.log(name, email, password);

    res.status(200).json({
        message: "Register route working"
    });
};

   //login User
    const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });

    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
    return res.status(401).json({
        message: "Invalid email or password"
    });
}

// Tokens
const token = generateToken(user._id);

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });


    res.status(200).json({
        message: "login successful"
        
    });
    
};


//logout

    const logoutUser = async (req, res) => {

    res.clearCookie("token");

    res.status(200).json({
        message: "Logout successful"
    });
};


//getCurrentUser 

const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        user
    });
};

export { registerUser, loginUser ,logoutUser,getCurrentUser  };