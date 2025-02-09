import { Schema, model, Document } from 'mongoose';

export interface IAssignment extends Document {
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    classId: Schema.Types.ObjectId;
}

const assignmentSchema = new Schema<IAssignment>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
});

const Class = model<IAssignment>('Class', assignmentSchema);
export default Class;
