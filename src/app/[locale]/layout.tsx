import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import GlobalChat from "@/components/chat/GlobalChat";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();
    const trans = await getTranslations('Index');

    return (
        <html lang={locale} suppressHydrationWarning className="dark">
            <body className={`${inter.className} bg-zinc-950 text-white antialiased selection:bg-blue-600/30`}>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <div className="flex min-h-screen flex-col relative pt-20">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <GlobalChat />
                    </div>
                    <Toaster />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
