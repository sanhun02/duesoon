'use client';
import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

type Inputs = {
    email: string;
    password: string;
    confirmPassword?: string;
};

interface AuthFormProps {
    mode: 'signIn' | 'signUp';
    onGoogleSignIn?: () => void;
}

export default function AuthForm({ mode, onGoogleSignIn }: AuthFormProps) {
    const { register, handleSubmit } = useForm<Inputs>();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: Inputs) => {
        if (mode === 'signIn') {
            const result = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Invalid email or password');
            } else {
                window.location.href = '/';
            }
        } else if (mode === 'signUp') {
            if (data.password !== data.confirmPassword) {
                setError("Passwords don't match");
                return;
            }

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const resData = await res.json();

            if (!res.ok) {
                setError(resData.error || 'Sign up failed');
            } else {
                window.location.href = '/';
            }
        }
    };

    return (
        <div className="flex flex-col gap-9 flex-1 items-center justify-center font-medium">
            <h1 className="text-3xl">
                {mode === 'signIn'
                    ? 'Sign in to your account'
                    : 'Create your account'}
            </h1>

            <button
                onClick={onGoogleSignIn}
                className="px-6 py-4 bg-black/5 border-none rounded-lg text-lg w-1/4"
            >
                {mode === 'signIn'
                    ? 'Sign in with Google'
                    : 'Sign up with Google'}
            </button>

            <p>or</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col w-1/4 gap-9"
            >
                <div className="flex flex-col gap-5">
                    <input
                        {...register('email')}
                        type="email"
                        placeholder="Email"
                        required
                        className="border border-1 rounded-full p-4 px-5"
                    />

                    <input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        required
                        className="border border-1 rounded-full p-4 px-5"
                    />

                    {mode === 'signUp' && (
                        <input
                            {...register('confirmPassword')}
                            type="password"
                            placeholder="Confirm Password"
                            required
                            className="border border-1 rounded-full p-4 px-5"
                        />
                    )}

                    {mode === 'signIn' && (
                        <a href="#" className="underline">
                            Forgot password
                        </a>
                    )}
                </div>

                <button
                    type="submit"
                    className="flex justify-center items-center px-6 py-4 bg-black text-white border-none rounded-lg text-lg"
                >
                    {mode === 'signIn' ? 'Sign in' : 'Sign up'}
                </button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}
