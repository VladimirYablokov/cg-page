type Props = {
    bio?: string | null;
    image?: string | null;
    website?: string | null;
    onEdit?: () => void;
};

export default function AboutMeView({ bio, image, website, onEdit }: Props) {
    return (
        <div className="mx-auto max-w-2xl rounded-2xl border p-6 shadow-sm bg-white dark:bg-zinc-900">
            <div className="flex items-center gap-4">
                <img
                    src={image || "https://api.dicebear.com/9.x/initials/svg?seed=U"}
                    alt="Avatar"
                    className="h-16 w-16 rounded-full object-cover border"
                />
                <div>
                    <h2 className="text-xl font-semibold">Обо мне</h2>
                    {website ? (
                        <a
                            className="text-sm underline text-blue-600"
                            href={website}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {website}
                        </a>
                    ) : (
                        <p className="text-sm text-zinc-500">Ссылка на сайт не указана</p>
                    )}
                </div>
            </div>

            <p className="mt-4 whitespace-pre-wrap">
                {bio || "Пока здесь пусто. Нажми «Редактировать», чтобы заполнить профиль."}
            </p>

            {onEdit && (
                <div className="mt-6">
                    <button
                        onClick={onEdit}
                        className="rounded-xl px-4 py-2 border hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    >
                        Редактировать
                    </button>
                </div>
            )}
        </div>
    );
}
