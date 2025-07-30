'use client';

import { useSearchParams } from 'next/navigation';

const errors: Record<string, string> = {
    Configuration: 'Ошибка конфигурации сервера авторизации.',
    AccessDenied: 'Доступ запрещён. Возможно, у вас нет прав.',
    Verification: 'Ссылка для входа недействительна или устарела.',
    OAuthAccountNotLinked: 'Этот аккаунт уже зарегистрирован. Используй другой способ входа.',
    Default: 'Произошла неизвестная ошибка при входе.',
};

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const errorType = searchParams.get('error') || 'Default';

    return (
        <div className="max-w-md mx-auto mt-10 text-center">
            <h1 className="text-2xl font-bold text-red-600">Ошибка входа</h1>
            <p className="mt-4 text-gray-700">
                {errors[errorType] || errors.Default}
            </p>
            <a href="/auth/signin" className="mt-6 inline-block text-blue-600 underline">
                Вернуться на страницу входа
            </a>
        </div>
    );
}
