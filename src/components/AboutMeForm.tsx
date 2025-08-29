"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AboutMeForm({ profile, onSaved }: { profile: any; onSaved: () => void }) {
    const [bio, setBio] = useState(profile?.bio || "");
    const [image, setImage] = useState(profile?.image || "");
    const [website, setWebsite] = useState(profile?.website || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bio, image, website }),
        });

        setLoading(false);
        onSaved();
    };

    return (
        <Card className="max-w-lg mx-auto mt-6 shadow-lg rounded-2xl">
            <CardHeader>
                <CardTitle>Редактирование профиля</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        placeholder="Описание"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                    />
                    <Input
                        placeholder="URL изображения"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <Input
                        placeholder="Личный сайт"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? "Сохраняем..." : "Сохранить"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
