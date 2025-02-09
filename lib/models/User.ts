import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    classes: Schema.Types.ObjectId[];
    assignments: Schema.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
});

const User = model<IUser>('User', userSchema);
export default User;
