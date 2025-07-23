import { getProviders, signIn } from "next-auth/react";

export default async function SignIn() {
    const providers = await getProviders();

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Вход в портфолио</h1>
            {providers &&
                Object.values(providers).map((provider) => (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id)}>
                            Войти через {provider.name}
                        </button>
                    </div>
                ))}
        </div>
    );
}
