'use client';
import { signIn } from 'next-auth/react';
import AuthNavBar from '@/components/auth/AuthNavBar';
import AuthForm from '@/components/auth/AuthForm';

export default function SignInPage() {
    const handleGoogleSignIn = async () => {
        const result = await signIn('google', {
            redirect: false,
            callbackUrl: '/',
        });

        if (result?.error) {
            console.error('Google sign-in failed', result.error);
        } else {
            console.log('Google sign-in successful');
        }
    };

    return (
        <div className="flex flex-col min-h-screen w-full">
            <AuthNavBar />

            <AuthForm mode='signIn' onGoogleSignIn={handleGoogleSignIn} />
        </div>
    );
}
