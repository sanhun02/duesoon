import { NextApiRequest, NextApiResponse } from 'next';
import { signUpUser } from '../../../../../lib/mongodb'; // import the signUpUser function
import { signIn } from 'next-auth/react';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await signUpUser(email, password);

        return res.status(200).json({ message: 'User created successfully', user });
    } catch (error: any) {
        return res
            .status(500)
            .json({ error: error.message || 'Something went wrong' });
    }
}
