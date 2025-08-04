import './globals.css';
import { Providers } from './providers';
import {SessionProvider} from "next-auth/react";

export const metadata = {
    title: 'Моё портфолио',
    description: '...',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
