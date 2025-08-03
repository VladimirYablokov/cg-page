'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function UserNav() {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <p>Загрузка...</p>;
    }

    if (!session) {
        return (
            <button onClick={() => signIn()} className="text-sm text-blue-600">
                Войти
            </button>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <p className="text-sm">{session.user?.email}</p>
            <button onClick={() => signOut()} className="text-sm text-red-600">
                Выйти
            </button>
        </div>
    );
}
