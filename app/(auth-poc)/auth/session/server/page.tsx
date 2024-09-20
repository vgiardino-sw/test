import { auth } from "@/auth"
import UserCard from '@/components/auth-poc/user-card'
import { redirect } from "next/navigation"

export default async function ServerPage() {
    const session = await auth()

    if (!session) {
        redirect('/api/auth/login?callbackUrl=/auth/server')
    }

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Server"} />
        </section>
    )

}
