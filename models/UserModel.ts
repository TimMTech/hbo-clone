import mongoose from "mongoose"

interface UserSchema {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

const userSchema = new mongoose.Schema<UserSchema>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.models.UserSchema || mongoose.model("User", userSchema)