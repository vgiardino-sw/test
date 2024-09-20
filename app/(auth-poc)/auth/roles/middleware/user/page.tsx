import { auth } from "@/auth"

export default async function Home() {
    const session = await auth()

    return (
        <section className="flex flex-col gap-6">
            <h1 className="text-5xl">Welcome to the User Page</h1>
            <h2 className="text-3xl">This is page protected by middleware</h2>
            <p>Your roles are: {JSON.stringify(session?.user?.roles)}</p>
        </section>
    )
}