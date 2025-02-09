import { usePathname } from 'next/navigation';

export default function AuthNavBar() {
    const pathname = usePathname();
    const path = pathname.split("/");

    const isSignUpPage = path[path.length - 1] === 'signup';
    const linkText = isSignUpPage
        ? 'Already have an account?'
        : "Don't have an account?";
    // const linkHref = isSignUpPage ? '/signin' : '/signup';
    const actionText = isSignUpPage ? 'Sign In' : 'Sign Up';

    return (
        <nav className="flex justify-between items-center pt-6 px-12">
            <div>
                <a href="#" className="font-bold text-3xl">
                    DueSoon
                </a>
            </div>

            <div className="flex gap-8 items-center font-medium">
                <p>
                    {linkText}{' '}
                    <a href="#" className="underline">
                        {actionText}
                    </a>
                </p>
            </div>
        </nav>
    );
}
