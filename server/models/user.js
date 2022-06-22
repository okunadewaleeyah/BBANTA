import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true },
    user_Id: { trype: String }
})

export default mongoose.model('User', userSchema)