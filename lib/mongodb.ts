import mongoose from "mongoose";
import User from "./models/User";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.DATABASE_URL || "";

if (!MONGODB_URI) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env");
}

export async function connectMongo() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");
}

export async function signUpUser(email: string, password: string) {
    await connectMongo();
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    return newUser;
}