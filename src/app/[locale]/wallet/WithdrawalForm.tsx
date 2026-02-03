"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestWithdrawal } from "@/actions/wallet";

export default function WithdrawalForm({ balance }: { balance: number }) {
    const [data, setData] = useState({ amount: 0, iban: '', fullName: '' });

    const handleWithdraw = async () => {
        if (data.amount > balance) {
            alert("Yetersiz Bakiye!");
            return;
        }
        try {
            await requestWithdrawal(data.amount, data.iban, data.fullName);
            alert("Çekim talebi oluşturuldu!");
            location.reload();
        } catch (e) {
            alert("Hata oluştu");
        }
    };

    return (
        <div className="flex flex-col gap-6 mt-12 bg-white/[0.02] border border-white/10 p-10 rounded-[32px]">
            <h3 className="text-xl font-black italic uppercase">Para Çekme Talebi</h3>
            <div className="grid md:grid-cols-3 gap-4">
                <Input type="number" placeholder="Tutar" onChange={(e) => setData({ ...data, amount: Number(e.target.value) })} />
                <Input placeholder="Ad Soyad" onChange={(e) => setData({ ...data, fullName: e.target.value })} />
                <Input placeholder="IBAN (TR...)" onChange={(e) => setData({ ...data, iban: e.target.value })} />
            </div>
            <Button onClick={handleWithdraw} className="bg-blue-600 h-14 rounded-2xl font-black uppercase tracking-widest">TALEP OLUŞTUR</Button>
        </div>
    );
}
