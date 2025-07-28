// src/app/auth/signin/page.tsx
'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"

export default function SignInPage() {
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await signIn("email", { email })
    }

    return (
        <div style={{ padding: "2rem", maxWidth: 400, margin: "0 auto" }}>
            <h1>Вход по email</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <input
                    type="email"
                    placeholder="Введите email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Отправить ссылку</button>
            </form>
        </div>
    )
}
