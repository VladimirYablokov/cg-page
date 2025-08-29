// "use client";
import { useState } from "react";

type Props = {
    initial: { bio: string | null; image: string | null; website: string | null } | null;
    onCancel?: () => void;
    onSaved?: (data: any) => void;
};

export default function AboutMeForm({ initial, onCancel, onSaved }: Props) {
    const [bio, setBio] = useState(initial?.bio ?? "");
    const [image, setImage] = useState(initial?.image ?? "");
    const [website, setWebsite] = useState(initial?.website ?? "");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError(null);
        try {
            const res = await fetch("/api/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bio, image, website }),
            });
            if (!res.ok) {
                const j = await res.json().catch(() => ({}));
                throw new Error(j.error || `Save failed (${res.status})`);
            }
            const data = await res.json();
            onSaved?.(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <form
            onSubmit={submit}
            className="mx-auto max-w-2xl rounded-2xl border p-6 shadow-sm space-y-4 bg-white dark:bg-zinc-900"
        >
            <div>
                <label className="block text-sm mb-1">Аватар (URL)</label>
                <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 bg-transparent"
                    placeholder="https://..."
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Личный сайт</label>
                <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 bg-transparent"
                    placeholder="https://example.com"
                />
            </div>

            <div>
                <label className="block text-sm mb-1">Био</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={6}
                    className="w-full rounded-xl border px-3 py-2 bg-transparent"
                    placeholder="Коротко о себе…"
                />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl px-4 py-2 border bg-black text-white dark:bg-white dark:text-black disabled:opacity-50"
                >
                    {saving ? "Сохраняю…" : "Сохранить"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl px-4 py-2 border hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                        Отмена
                    </button>
                )}
            </div>
        </form>
    );
}
