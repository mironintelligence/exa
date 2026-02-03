import { Link } from "@/navigation";
import { Gamepad2, Twitter, Instagram, Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-zinc-950 border-t border-white/5 py-32 mt-40">
            <div className="container mx-auto px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_24px_rgba(37,99,235,0.4)]">
                            <Gamepad2 className="w-6 h-6" />
                        </div>
                        <span className="text-4xl font-black italic tracking-tighter text-blue-500">ExA</span>
                    </div>
                    <p className="text-zinc-500 text-sm font-bold uppercase leading-relaxed tracking-tight max-w-xs">
                        Geleceğin espor merkezi. Oynayın, kazanın ve profesyonel kariyerinize bugün başlayın.
                    </p>
                    <div className="flex items-center gap-4">
                        {[Twitter, Instagram, Github].map((Icon, i) => (
                            <button key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:border-blue-500/50 transition-all">
                                <Icon className="w-4 h-4" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Platform</h4>
                    <div className="flex flex-col gap-4">
                        <Link href="/tournaments" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">Turnuvalar</Link>
                        <Link href="/shop" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">Mağaza</Link>
                        <Link href="/leaderboard" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">Leaderboard</Link>
                        <Link href="/quests" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">Görevler</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Yasal</h4>
                    <div className="flex flex-col gap-4">
                        <Link href="/terms" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">Kullanım Şartları</Link>
                        <Link href="/privacy" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">Gizlilik Politikası</Link>
                        <Link href="/user-agreement" className="text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-blue-500 transition-colors">Kullanıcı Sözleşmesi</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Bülten</h4>
                    <div className="flex flex-col gap-6">
                        <p className="text-xs font-bold uppercase text-zinc-600 tracking-widest leading-loose">Yeni turnuvalar ve ödüller hakkında bilgi al.</p>
                        <div className="flex gap-2">
                            <input className="h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-sm w-full outline-none focus:border-blue-500 transition-all" placeholder="EMAIL" />
                            <button className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white italic font-black shadow-lg">GO</button>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black italic text-zinc-700 uppercase">By Miron Intelligence</span>
                            <span className="text-[8px] font-bold text-zinc-800 uppercase tracking-widest">© 2024 ExA. All Rights Reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
