import { omit } from 'lodash';
import {DocumentDefinition, FilterQuery} from 'mongoose';
import UserModel from '../model/user.model';
import { UserDocument } from '../model/user.model';

export const createUser = async (input:DocumentDefinition<Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>>) => {
    try {
        let user = new UserModel(input)
        await user.save();
        //return await UserModel.create(input);
        return omit(user.toJSON(), 'password');
    } catch (error:any) {
        throw new Error(error );
    }
}

export const validatePassword = async ({email, password}: {email: string, password: string}) => {
    let user =  await UserModel.findOne({email});

    if (!user){
        return false;
    }

    const isValid = user.comparePassword(password);

    if(!isValid){
        return false;
    }

    return omit(user.toJSON(), 'password');
}

export const findUser = async (query: FilterQuery<UserDocument>) => {
    let user = await UserModel.findById(query).lean();

    return omit(user, 'password');
}