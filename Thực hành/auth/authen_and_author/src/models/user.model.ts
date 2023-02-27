import {Schema, model} from 'mongoose';

interface IFUser {
    username: string;
    password: string;
    role: string;
}

const UserSchema = new Schema<IFUser>({
    username: String,
    password: String,
    role: String
})

const UserModel = model<IFUser>('User', UserSchema);

export {UserModel};