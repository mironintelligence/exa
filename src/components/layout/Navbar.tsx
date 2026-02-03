import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Wallet, User as UserIcon, ShieldAlert, Moon, Sun } from "lucide-react";

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
                        <Link key={item} href={`/${item === 'home' ? '' : item}`} className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">{item}</Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center p-1 bg-white/5 rounded-full border border-white/10">
                        <button className="p-1.5 rounded-full bg-blue-600 text-white"><Moon className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded-full text-zinc-500 hover:text-white"><Sun className="w-4 h-4" /></button>
                    </div>

                    {!session ? (
                        <div className="flex items-center gap-2">
                            <Link href="/auth/login"><Button variant="ghost" className="text-xs font-bold uppercase">Giriş</Button></Link>
                            <Link href="/auth/register"><Button className="bg-blue-600 rounded-full px-6 text-xs font-black uppercase text-white">KAYIT</Button></Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-6">
                            <div className="hidden lg:flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400">
                                <Wallet className="w-4 h-4" />
                                <span className="text-sm font-black italic">₺{(session.user as any).walletBalance?.toLocaleString()}</span>
                            </div>
                            <Link href="/profile" className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                                {session.user.image ? <img src={session.user.image} alt="" className="w-full h-full object-cover" /> : <UserIcon className="w-5 h-5 text-white" />}
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
