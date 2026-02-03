"use client";

import { signOut } from "next-auth/react";
import { Link } from "@/navigation";
import { User as UserIcon, ShieldAlert, LogOut, Wallet, CreditCard, History, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UserNav({ session }: { session: any }) {
    if (!session) {
        return (
            <div className="flex items-center gap-4">
                <Link href="/auth/login">
                    <Button variant="ghost" className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 h-12 px-6 rounded-2xl">GİRİŞ</Button>
                </Link>
                <Link href="/auth/register">
                    <Button className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-black uppercase tracking-widest h-12 px-8 rounded-2xl shadow-[0_8px_24px_-8px_rgba(37,99,235,1)] border border-white/10">KAYIT OL</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-8">
            {/* Wallet Widget */}
            <div className="hidden xl:flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 transition-all group cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <Wallet className="w-4 h-4" />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">CÜZDAN</span>
                    <span className="text-sm font-black italic text-white tracking-tighter">₺{session.user.walletBalance?.toLocaleString() || '0'}</span>
                </div>
            </div>

            {/* User Dropdown */}
            <div className="relative group">
                <button className="w-12 h-12 rounded-2xl bg-blue-600 border-2 border-white/10 flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 transition-all shadow-xl">
                    {session.user.image ? (
                        <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center text-white font-black italic">
                            {session.user.name?.charAt(0) || 'U'}
                        </div>
                    )}
                </button>

                {/* Tactical Dropdown Menu */}
                <div className="absolute top-full right-0 mt-6 w-72 p-3 bg-zinc-950/95 backdrop-blur-3xl border border-white/10 rounded-[32px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-[0_32px_64px_-16px_rgba(0,0,0,1)] z-50">
                    <div className="p-4 mb-2 flex items-center gap-4 border-b border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-black italic text-blue-500">PRO</div>
                        <div className="flex flex-col leading-none">
                            <span className="text-xs font-black uppercase text-white truncate max-w-[150px]">{session.user.name}</span>
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Level 12 • Radiant</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Link href="/profile" className="flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                            <UserIcon className="w-4 h-4" /> Profilim
                        </Link>
                        <Link href="/wallet" className="flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                            <History className="w-4 h-4" /> İşlem Geçmişi
                        </Link>
                        <Link href="/subscriptions" className="flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all">
                            <CreditCard className="w-4 h-4" /> Aboneliğim
                        </Link>

                        {session.user.role === 'ADMIN' && (
                            <Link href="/admin" className="flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/5 hover:bg-blue-500/10 rounded-2xl transition-all mt-2">
                                <ShieldAlert className="w-4 h-4" /> Yönetim Paneli
                            </Link>
                        )}
                    </div>

                    <div className="h-[1px] bg-white/5 my-3 mx-4" />

                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-3 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 rounded-2xl transition-all shadow-inner"
                    >
                        <LogOut className="w-4 h-4" /> Oturumu Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}
