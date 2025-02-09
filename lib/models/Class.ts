import { Schema, model, Document } from 'mongoose';

export interface IClass extends Document {
    name: string;
    professor: string;
    days: string[];
    startTime: Date;
    endTime: Date;
    location: string;
}

const classSchema = new Schema<IClass>({
    name: { type: String, required: true },
    professor: { type: String, required: false },
    days: [{ type: String, required: true }],
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    location: { type: String, required: true },
});

const Class = model<IClass>('Class', classSchema);
export default Class;
