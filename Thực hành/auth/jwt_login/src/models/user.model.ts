import {Schema, model} from 'mongoose';

interface IFUser {
    username: string;
    password: string;
}

const userSchema = new Schema<IFUser>({
    username: String,
    password: String
});

const UserModel = model<IFUser>('User', userSchema);
export {UserModel}

