import mongoose from "mongoose";


interface UserSchema {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    ads: string,
    billing: string,
    movies: []
    tv: []
}

const UserTemplate = new mongoose.Schema<UserSchema>({
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
    },
    ads: {
        type: String,
        required: true
    },
    billing: {
        type: String,
        required: true
    },
    movies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie"
        }
    ],
    tv: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TV"
        }
    ]
    
})

module.exports = mongoose.models.User || mongoose.model("User", UserTemplate)