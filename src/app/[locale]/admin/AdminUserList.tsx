"use client";

import { adminUpdateUser } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, UserPlus, Ban, MoreVertical, Edit2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminUserList({ users }: any) {
    const router = useRouter();

    const handleUpdate = async (id: string, role: any) => {
        await adminUpdateUser(id, { role });
        router.refresh();
        alert("Role güncellendi");
    };

    const handleBalance = async (id: string, current: number) => {
        const amount = prompt("Yeni bakiye giriniz:", current.toString());
        if (amount !== null) {
            await adminUpdateUser(id, { walletBalance: Number(amount) });
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col gap-10 animate-in fade-in duration-500">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black italic tracking-tighter uppercase text-white">OYUNCU DATABASESI</h2>
                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em]">Sistemdeki tüm kayıtlı kullanıcıların yönetimi</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {users.map((u: any) => (
                    <Card key={u.id} className="bg-zinc-900 border-white/5 rounded-[32px] overflow-hidden group hover:border-blue-500/20 transition-all">
                        <CardContent className="p-8 flex items-center justify-between">
                            <div className="flex items-center gap-8">
                                <div className="w-16 h-16 rounded-3xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center font-black italic text-blue-500 text-2xl group-hover:scale-105 transition-transform">
                                    {u.name?.charAt(0)}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl font-black italic tracking-tighter text-white uppercase">{u.name}</span>
                                        <Badge className={`uppercase text-[8px] font-black ${u.role === 'ADMIN' ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                                            {u.role}
                                        </Badge>
                                    </div>
                                    <span className="text-zinc-600 text-xs font-bold uppercase tracking-widest">{u.email}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-16">
                                <div className="flex flex-col items-center">
                                    <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">BAKİYE</span>
                                    <span className="text-xl font-black italic text-blue-500 tracking-tighter">₺{u.walletBalance.toLocaleString()}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">LEVEL</span>
                                    <span className="text-xl font-black italic text-white tracking-tighter">{u.level}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleBalance(u.id, u.walletBalance)}
                                        variant="outline"
                                        className="w-12 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-blue-600 hover:text-white transition-all"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        onClick={() => handleUpdate(u.id, u.role === 'ADMIN' ? 'USER' : 'ADMIN')}
                                        variant="outline"
                                        className="w-12 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-blue-600 hover:text-white transition-all"
                                    >
                                        <Shield className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-12 h-12 rounded-xl border-white/10 bg-white/5 hover:bg-red-600 hover:text-white transition-all"
                                    >
                                        <Ban className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
