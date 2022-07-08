import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document{
    user: UserDocument['_id'];
    valid: string;
    agent: string;
    createdAt: Date;
    updatedAt: Date;
}

const SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    valid: {
        type: String,
    },
    agent:{
        type: String,
    }
},{
    timestamps: true
})

const SessionModel = mongoose.model("Session", SessionSchema)

export default SessionModel;