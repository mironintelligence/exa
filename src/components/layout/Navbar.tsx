import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';

export function Navbar() {
    const t = useTranslations('Navigation');

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold italic tracking-tighter">
                    ExA<span className="text-blue-600">.</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/tournaments" className="hover:text-blue-500 transition-colors uppercase tracking-widest">{t('tournaments')}</Link>
                    <Link href="/shop" className="hover:text-blue-500 transition-colors uppercase tracking-widest">{t('shop')}</Link>
                    <Link href="/wallet" className="hover:text-blue-500 transition-colors uppercase tracking-widest">{t('wallet')}</Link>
                    <Link href="/profile" className="hover:text-blue-500 transition-colors uppercase tracking-widest">{t('profile')}</Link>
                </div>

                <div className="flex items-center gap-4">
                    <Link href="/auth/login">
                        <Button variant="ghost" className="text-sm">Giriş Yap</Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-none px-8 font-bold uppercase transition-all hover:tracking-widest">Kayıt Ol</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
