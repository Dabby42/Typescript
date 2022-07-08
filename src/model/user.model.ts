import mongoose from "mongoose";
import config from 'config';
import bcrypt from 'bcrypt';

export interface UserDocument extends mongoose.Document{
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string):Boolean
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

UserSchema.pre('save', function(next){
    let user = this as UserDocument;
    if(!user.isModified('password')){
        return next()
    }
    
    const salt = bcrypt.genSaltSync(config.get<number>('saltWorkFactor'))
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    user.password = hashedPassword;

    return next();
})

UserSchema.methods.comparePassword = function (candidatePassword: string): boolean {
    let user = this as UserDocument;
    const status = bcrypt.compareSync(candidatePassword, user.password);

    return status;
}

const UserModel = mongoose.model<UserDocument>("User", UserSchema)

export default UserModel;