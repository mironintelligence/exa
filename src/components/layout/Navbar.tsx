import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Link } from "@/navigation";
import { UserNav } from "./UserNav";
import { ThemeToggle } from "./ThemeToggle";

export async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className="pointer-events-auto h-20 w-full max-w-7xl rounded-full border border-white/10 bg-zinc-950/40 backdrop-blur-2xl px-12 flex items-center justify-between shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]">
                {/* Logo Section */}
                <div className="flex flex-col gap-0 leading-none group cursor-pointer">
                    <Link href="/" className="text-3xl font-black italic tracking-tighter text-blue-600 transition-all group-hover:text-blue-400 group-hover:scale-105">
                        ExA
                    </Link>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 -mt-1 ml-1 scale-90 origin-left">By Miron</span>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-12">
                    {[
                        { name: 'Ana Sayfa', path: '/' },
                        { name: 'Turnuvalar', path: '/tournaments' },
                        { name: 'Mağaza', path: '/shop' },
                        { name: 'Liderler', path: '/leaderboard' },
                        { name: 'Görevler', path: '/quests' }
                    ].map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className="relative text-xs font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all group py-2"
                        >
                            {item.name}
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left shadow-[0_0_12px_rgba(37,99,235,1)]" />
                        </Link>
                    ))}
                </div>

                {/* Actions Section */}
                <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <UserNav session={session} />
                </div>
            </nav>
        </div>
    );
}
