'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import UserCard from '@/components/auth-poc/user-card'

export default function ClientPage() {
    // Remember you must use an AuthProvider for 
    // client components to useSession
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client')
        }
    })

    if (!session?.user) return
    const user = session?.user
    return (
        <section className="flex flex-col gap-6">
            <UserCard user={user} pagetype={"Client"} />
        </section>
    )
}