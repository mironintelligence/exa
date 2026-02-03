import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Wallet, LogOut, User as UserIcon, ShieldAlert } from "lucide-react";

export async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav className="pointer-events-auto h-16 w-full max-w-6xl rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-xl px-8 flex items-center justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
                {/* Left: Logo */}
                <Link href="/" className="text-2xl font-black italic tracking-tighter text-blue-500 hover:text-blue-400 transition-colors">
                    ExA
                </Link>

                {/* Center: Navigation */}
                <div className="hidden md:flex items-center gap-10">
                    {['home', 'tournaments', 'shop', 'leaderboard'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'home' ? '/' : `/${item}`}
                            className="relative group text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                        </Link>
                    ))}
                </div>

                {/* Right: Auth/User */}
                <div className="flex items-center gap-4">
                    {!session ? (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost" className="text-xs font-bold uppercase tracking-widest hover:bg-white/5">Giriş Yap</Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-full px-6 text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(37,99,235,0.4)]">Kayıt Ol</Button>
                            </Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400">
                                <Wallet className="w-3.5 h-3.5" />
                                <span className="text-sm font-black italic">₺{(session.user as any).walletBalance?.toLocaleString() || 0}</span>
                            </div>

                            <div className="relative group flex items-center gap-2 cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center border-2 border-white/10 overflow-hidden">
                                    {session.user?.image ? <img src={session.user.image} alt="Avatar" className="w-full h-full object-cover" /> : <UserIcon className="w-5 h-5" />}
                                </div>

                                {/* Minimalist Dropdown */}
                                <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-zinc-900 border border-white/10 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl">
                                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase hover:bg-white/5"><UserIcon className="w-4 h-4" /> Profil</Link>
                                    {(session.user as any).role === 'ADMIN' && (
                                        <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase text-blue-400 hover:bg-white/5"><ShieldAlert className="w-4 h-4" /> Yönetim</Link>
                                    )}
                                    <button onClick={() => { }} className="w-full flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase text-red-400 hover:bg-white/5"><LogOut className="w-4 h-4" /> Çıkış</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
