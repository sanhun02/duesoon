import { LandingHero } from '@/components/landingpage/LandingHero';
import { NavBar } from '../components/landingpage/NavBar';

export default function LandingPage() {
    return (
        <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)] flex flex-col">
            <NavBar />
            <LandingHero />
        </div>
    );
}
