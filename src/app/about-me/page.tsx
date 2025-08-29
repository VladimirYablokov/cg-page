"use client";

import { useState } from "react";
import useSWR from "swr";
import AboutMeView from "@/components/about/AboutMeViev";
import AboutMeForm from "@/components/about/AboutMeForm";
import { useSession, signIn } from "next-auth/react";

const fetcher = (url: string) => fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Fetch failed ${r.status}`);
    return r.json();
});

export default function AboutMePage() {
    const { status } = useSession();
    const { data, isLoading, error, mutate } = useSWR("/api/profile", fetcher);
    const [editing, setEditing] = useState(false);

    if (status === "loading") return <p className="p-6">Загрузка сессии…</p>;
    if (status === "unauthenticated") {
        return (
            <div className="p-6">
                <p className="mb-4">Нужно войти, чтобы редактировать профиль.</p>
                <button
                    onClick={() => signIn("email")}
                    className="rounded-xl px-4 py-2 border"
                >
                    Войти по email
                </button>
            </div>
        );
    }

    if (isLoading) return <p className="p-6">Загрузка профиля…</p>;
    if (error) return <p className="p-6 text-red-600">Ошибка: {String(error.message || error)}</p>;

    return (
        <main className="p-6 space-y-6">
            {!editing ? (
                <AboutMeView
                    bio={data?.bio}
                    image={data?.image}
                    website={data?.website}
                    onEdit={() => setEditing(true)}
                />
            ) : (
                <AboutMeForm
                    initial={data ?? null}
                    onCancel={() => setEditing(false)}
                    onSaved={(saved) => {
                        mutate(saved, false);
                        setEditing(false);
                    }}
                />
            )}
        </main>
    );
}
