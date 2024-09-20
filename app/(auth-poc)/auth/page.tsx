import { auth } from "@/auth";
import { ApiDataComponent } from "@/components/auth-poc/api-data-card";


export default async function Home() {
    const session = await auth()
    const token = session?.idToken || '';
    return (
      <div className="flex flex-col gap-6">
      <h1 className="text-5xl">Home Page</h1>
      <h2 className="text-2xl">The following data is being fetched from the API using the token:</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <ApiDataComponent title="Public" token={token} endpoint="/api/test/public" />
        <ApiDataComponent title="User" token={token} endpoint="/api/test/user" />
        <ApiDataComponent title="Admin" token={token} endpoint="/api/test/admin" />
      </div>
    </div>
    )
  }
  