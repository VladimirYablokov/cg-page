import UserNav from "../../components/UserNav";

export default function Header() {
    return (
        <header className="p-4 shadow bg-white flex justify-between">
            <h1 className="text-xl font-bold">Моё портфолио</h1>
            <UserNav />
        </header>
    );
}
