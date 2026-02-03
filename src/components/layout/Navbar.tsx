import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Link } from "@/navigation";
import { UserNav } from "./UserNav";
import { ThemeToggle } from "./ThemeToggle";

export async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className="pointer-events-auto h-16 w-full max-w-7xl rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-xl px-10 flex items-center justify-between shadow-2xl">
                <div className="flex flex-col gap-0 leading-none">
                    <Link href="/" className="text-2xl font-black italic tracking-tighter text-blue-500">
                        ExA
                    </Link>
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-500 -mt-1 ml-0.5 whitespace-nowrap">By Miron Intelligence</span>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    {['home', 'tournaments', 'shop', 'subscriptions'].map((item) => (
                        <Link key={item} href={`/${item === 'home' ? '' : item}`} className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors uppercase">{item}</Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <ThemeToggle />
                    <UserNav session={session} />
                </div>
            </nav>
        </div>
    );
}
