"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlert, ArrowRight, UserPlus, Mail, Lock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-[90vh] flex items-center justify-center container px-8 relative overflow-hidden">
            <div className="absolute inset-x-0 bottom-0 h-[500px] bg-[radial-gradient(circle_at_50%_100%,rgba(37,99,235,0.1),transparent_70%)] pointer-events-none" />

            <div className="w-full max-w-xl relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-500 rounded-[48px] blur-2xl opacity-10 group-hover:opacity-20 transition duration-1000" />

                <div className="relative bg-zinc-950/80 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 lg:p-16 shadow-3xl">
                    <div className="flex flex-col items-center text-center gap-6 mb-12">
                        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-2xl">
                            <UserPlus className="w-10 h-10" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Badge className="bg-blue-600/10 text-blue-500 font-black text-[8px] tracking-[0.4em] uppercase py-1 px-4 rounded-full w-fit mx-auto">YENİ OYUNCU</Badge>
                            <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">ARENAYA KATIL</h1>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-zinc-500 ml-6 tracking-widest">Ad Soyad</Label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                    <Input className="h-16 pl-14 bg-zinc-950 border-white/5 rounded-3xl font-bold" placeholder="NAMIK KEMAL" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-zinc-500 ml-6 tracking-widest">E-posta</Label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                    <Input className="h-16 pl-14 bg-zinc-950 border-white/5 rounded-3xl font-bold" placeholder="pro@exa.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-zinc-500 ml-6 tracking-widest">Şifre</Label>
                                <div className="relative">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                    <Input type="password" className="h-16 pl-14 bg-zinc-950 border-white/5 rounded-3xl font-bold" placeholder="••••••••" />
                                </div>
                            </div>
                        </div>

                        <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest text-center px-6 leading-loose">
                            KAYIT OLARAK <span className="text-white">KULLANIM ŞARTLARINI</span> VE <span className="text-white">GİZLİLİK POLİTİKASINI</span> KABUL ETMİŞ SAYILIRSINIZ.
                        </p>

                        <Button className="w-full h-18 rounded-3xl bg-white text-black hover:bg-zinc-200 font-black uppercase tracking-[0.2em] shadow-xl text-xs group mt-4">
                            HESAP OLUŞTUR
                            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">
                            ZATEN ÜYE MİSİN? <Link href="/auth/login" className="text-blue-500 font-black hover:text-cyan-400 ml-2">OTURUM AÇ</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
