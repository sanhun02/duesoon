import React from 'react';

export const LandingHero = () => {
    return (
        <div className='flex flex-col items-center justify-center flex-1 text-center gap-16'>
            <div className='flex flex-col gap-5'>
                <div>
                    <h1 className='font-bold text-7xl'>Never Miss a Deadline Again.</h1>
                </div>

                <div>
                    <h2 className='font-medium text-xl text-black/55'>
                        Track assignments, manage your class schedule, and get
                        reminders—all in one simple app.
                    </h2>
                </div>
            </div>

            <div>
                <a href="#" className='flex items-center justify-center px-6 py-4 border border-1 rounded-lg bg-black text-white text-lg font-semibold'>Get started for free</a>
            </div>
        </div>
    );
};
