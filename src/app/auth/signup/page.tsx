'use client';
import AuthNavBar from '@/components/auth/AuthNavBar';
import AuthForm from '@/components/auth/AuthForm';

export default function SignUpPage() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <AuthNavBar />

            <AuthForm mode="signUp" />
        </div>
    );
}
