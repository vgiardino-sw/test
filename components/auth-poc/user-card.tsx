import type { User } from "next-auth"

type Props = {
    user?: User | null,
    pagetype: string,
}

export default function Card({ user, pagetype }: Props) {
    const roles = user?.roles?.join(", ");
    const greeting = user?.name ? (
        <div className="flex flex-col items-center p-6 rounded-lg font-bold text-5xl">
            Hello {user?.name}!
        </div>
    ) : null

    return (
        <section className="flex flex-col gap-4">
            {greeting}
            <p className="text-2xl text-center">{pagetype} Page!</p>
            <p className="text-2xl text-center">Roles: {roles}</p>
        </section>
    )
}