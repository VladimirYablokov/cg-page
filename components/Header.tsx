'use client';

// import UserNav from "./UserNav";
//
// export default function Header() {
//     return (
//         <header className="p-4 shadow bg-white flex justify-between">
//             <h1 className="text-xl font-bold">Моё портфолио</h1>
//             <UserNav />
//         </header>
//     );
// }

'use client';

import { useSession, signOut } from "next-auth/react";

export function Header() {
    const { data: session } = useSession();

    return (
        <header className="p-4 bg-gray-100 flex justify-between">
            <div>🌐 Portfolio</div>
            {session ? (
                <div>
                    Привет, {session.user?.email}
                    <button onClick={() => signOut()} className="ml-4 text-blue-600">Выйти</button>
                </div>
            ) : (
                <a href="/auth/signin" className="text-blue-600">Войти</a>
            )}
        </header>
    );
}
