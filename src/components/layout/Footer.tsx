import { Link } from "@/navigation";

export function Footer() {
    return (
        <footer className="w-full bg-zinc-950 border-t border-white/5 py-20 mt-32">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="flex flex-col gap-4">
                    <span className="text-3xl font-black italic text-blue-500">ExA</span>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">Geleceğin espor merkezi. Oynayın, kazanın ve profesyonel kariyerinize başlayın.</p>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Platform</h4>
                    <div className="flex flex-col gap-3">
                        <Link href="/tournaments" className="text-sm text-zinc-500 hover:text-blue-500 transition-colors">Turnuvalar</Link>
                        <Link href="/shop" className="text-sm text-zinc-500 hover:text-blue-500 transition-colors">Mağaza</Link>
                        <Link href="/subscriptions" className="text-sm text-zinc-500 hover:text-blue-500 transition-colors">Abonelikler</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Yasal</h4>
                    <div className="flex flex-col gap-3">
                        <Link href="/terms" className="text-sm text-zinc-500 hover:text-blue-500 transition-colors">Kullanım Şartları</Link>
                        <Link href="/privacy" className="text-sm text-zinc-500 hover:text-blue-500 transition-colors">Gizlilik Politikası</Link>
                        <Link href="/user-agreement" className="text-sm text-zinc-500 hover:text-blue-500 transition-colors">Kullanıcı Sözleşmesi</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Destek</h4>
                    <div className="flex flex-col gap-3">
                        <Link href="#" className="text-sm text-zinc-500 hover:text-blue-500 transition-colors font-bold uppercase">By Miron Intelligence</Link>
                        <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">© 2024 ExA. Tüm Hakları Saklıdır.</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
