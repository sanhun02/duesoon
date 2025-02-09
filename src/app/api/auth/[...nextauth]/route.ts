import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongo } from '../../../../../lib/mongodb';
import User from '../../../../../lib/models/User';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongoose';

interface User {
    id: string;
    email: string;
    classes: ObjectId[];
    assignments: ObjectId[];
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                await connectMongo();

                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing email or password');
                }

                const user = await User.findOne({ email: credentials.email })
                    .populate('classes')
                    .populate('assignments');
                if (!user) throw new Error('User not found');

                const isValidPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );
                if (!isValidPassword) throw new Error('Invalid password');

                const userObj = user.toObject();

                return {
                    id: userObj._id as string,
                    email: userObj.email,
                    classes: userObj.classes,
                    assignments: userObj.assignments,
                } as User;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? '',
        }),
    ],
    session: { strategy: 'jwt' },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
