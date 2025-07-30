import validator from 'validator';
import bycrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'



// API to register user

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating user email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a Valid Email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a Strong Password" })
        }

        // hashing user password
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)

        const useData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(useData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

// API to Login user

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ succes: false, message: "User Doesn't Exist" })
        }

        const isMatch = await bycrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'Invalid Credentails' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }

}

export { registerUser, loginUser }