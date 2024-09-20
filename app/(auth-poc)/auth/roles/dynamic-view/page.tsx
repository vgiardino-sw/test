import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { revalidatePath } from "next/cache";
import { hasRole } from "@/lib/auth.utils";
import AddUserDialog from "@/components/auth-poc/add-user-dialog";
import EditUserDialog from "@/components/auth-poc/edit-user-dialog";

// Mock data - in a real app, this would be in a database
let mockData = [
  { id: 1, name: "Valentino Giardino", email: "valentino.giardino@southworks.com", role: "Admin" },
  { id: 2, name: "Alejo Maya", email: "alejo.maya@southworks.com", role: "User" },
  { id: 3, name: "Eugenio Rossetto", email: "eugenio.rossetto@southworks.com", role: "User" },
  { id: 4, name: "Agustin Magliano", email: "agustin.magliano@southworks.com", role: "User" },

];

// Server actions
async function addUser(formData: FormData) {
  "use server"
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const newUser = { id: mockData.length + 1, name, email, role };
  mockData.push(newUser);
  revalidatePath("/auth/roles/dynamic-view");
}

async function editUser(formData: FormData) {
  "use server"
  const id = parseInt(formData.get("id") as string);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const index = mockData.findIndex(user => user.id === id);
  if (index !== -1) {
    mockData[index] = { id, name, email, role };
  }
  revalidatePath("/auth/roles/dynamic-view");
}

async function deleteUser(formData: FormData) {
  "use server"
  const id = parseInt(formData.get("id") as string);
  mockData = mockData.filter(user => user.id !== id);
  revalidatePath("/auth/roles/views");
}

export default async function RolesPage() {
  const session = await auth()

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const roles = session?.user?.roles || []
  const isAdmin = hasRole(roles || [], "Admin");

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <p className="mb-4">Current roles: {JSON.stringify(roles) || "Not authenticated"}</p>

      {isAdmin && <AddUserDialog addUser={addUser} />}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            {isAdmin && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              {isAdmin && (
                <TableCell>
                  <EditUserDialog editUser={editUser} user={user} />
                  <form action={deleteUser} className="inline">
                    <input type="hidden" name="id" value={user.id} />
                    <Button type="submit" variant="destructive" size="sm">Delete</Button>
                  </form>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}