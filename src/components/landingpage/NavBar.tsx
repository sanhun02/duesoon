export const NavBar = () => {
    return (
        <nav className="flex justify-between items-center pt-6 px-12">
            <div>
                <a href="#" className="font-bold text-3xl">DueSoon</a>
            </div>

            <div className="flex gap-8 items-center font-semibold">
                <a href="#" className="text-lg">Sign in</a>
                <a href="#" className="flex items-center justify-center px-5 py-3 border border-1 rounded-lg bg-black text-white">Get started</a>
            </div>
        </nav>
    );
};
