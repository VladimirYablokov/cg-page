"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AboutMePage() {
    const { data: session, status } = useSession();
    const [profile, setProfile] = useState({ bio: "", image: "", website: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "authenticated") {
            fetch("/api/profile")
                .then(res => res.json())
                .then(data => {
                    if (data) setProfile(data);
                })
                .finally(() => setLoading(false));
        }
    }, [status]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(profile),
        });
        alert("Профиль обновлён");
    };

    if (loading) return <p>Загрузка...</p>;
    if (status !== "authenticated") return <p>Вы не авторизованы</p>;

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">О себе</h1>

            <label className="block mb-2">Bio</label>
            <textarea
                name="bio"
                className="w-full p-2 border rounded mb-4"
                value={profile.bio}
                onChange={handleChange}
            />

            <label className="block mb-2">Image URL</label>
            <input
                name="image"
                className="w-full p-2 border rounded mb-4"
                value={profile.image}
                onChange={handleChange}
            />

            <label className="block mb-2">Website</label>
            <input
                name="website"
                className="w-full p-2 border rounded mb-4"
                value={profile.website}
                onChange={handleChange}
            />

            <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Сохранить
            </button>
        </div>
    );
}
