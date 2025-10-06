import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-600">
          Signed in as {session?.user?.email}
        </p>
      </header>
      <section className="grid place-items-center h-40 border rounded">
        <span className="text-lg font-medium">Pending</span>
      </section>
    </main>
  );
}
