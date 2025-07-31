"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function UserNav() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <p>Загрузка...</p>;
    }

    if (!session) {
        return (
            <button
                onClick={() => signIn("email")}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Войти
            </button>
        );
    }

    return (
        <div className="flex items-center gap-4">
            <span className="text-gray-700">{session.user?.email}</span>
            <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Выйти
            </button>
        </div>
    );
}
