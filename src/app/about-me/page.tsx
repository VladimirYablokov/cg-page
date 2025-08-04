"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AboutMeClient() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState({ bio: "", website: "", image: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            const res = await fetch("/api/profile");
            if (res.ok) {
                const data = await res.json();
                setProfile(data || { bio: "", website: "", image: "" });
            }
            setLoading(false);
        }
        fetchProfile();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/profile", {
            method: "PUT",
            body: JSON.stringify(profile),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) alert("Профиль обновлён");
    };

    if (status === "loading" || loading) return <p>Загрузка...</p>;

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
            <h2 className="text-xl font-bold">Обо мне</h2>

            <div>
                <label className="block mb-1">Биография</label>
                <textarea
                    className="w-full border rounded p-2"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
            </div>

            <div>
                <label className="block mb-1">Сайт или соцсеть</label>
                <input
                    className="w-full border rounded p-2"
                    type="text"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                />
            </div>

            <div>
                <label className="block mb-1">Аватар (URL)</label>
                <input
                    className="w-full border rounded p-2"
                    type="text"
                    value={profile.image}
                    onChange={(e) => setProfile({ ...profile, image: e.target.value })}
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Сохранить
            </button>
        </form>
    );
}
