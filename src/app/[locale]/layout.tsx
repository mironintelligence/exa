import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default async function LocaleLayout({
    children,
    params: { locale }
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const messages = await getMessages();

    return (
        <html lang={locale} className="dark">
            <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen pt-20 flex flex-col`}>
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
