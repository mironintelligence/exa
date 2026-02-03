"use client";

import { signOut } from "next-auth/react";
import { Link } from "@/navigation";
import { User as UserIcon, ShieldAlert, LogOut, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserNav({ session }: { session: any }) {
    if (!session) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/auth/login"><Button variant="ghost" className="text-xs font-bold uppercase">Giriş</Button></Link>
                <Link href="/auth/register"><Button className="bg-blue-600 rounded-full px-6 text-xs font-black uppercase text-white">KAYIT</Button></Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-2 px-6 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400">
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-black italic">₺{session.user.walletBalance?.toLocaleString() || '0'}</span>
            </div>

            <div className="relative group">
                <button className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                    {session.user.image ? (
                        <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon className="w-5 h-5 text-white" />
                    )}
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full right-0 mt-4 w-56 p-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-3xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all shadow-2xl z-50">
                    <Link href="/profile" className="flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                        <UserIcon className="w-4 h-4" /> Profil
                    </Link>
                    {session.user.role === 'ADMIN' && (
                        <Link href="/admin" className="flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-blue-500 hover:bg-blue-500/10 rounded-2xl transition-all">
                            <ShieldAlert className="w-4 h-4" /> Yönetim
                        </Link>
                    )}
                    <div className="h-[1px] bg-white/5 my-2" />
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    >
                        <LogOut className="w-4 h-4" /> Çıkış Yap
                    </button>
                </div>
            </div>
        </div>
    );
}
