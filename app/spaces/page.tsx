import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { spaces } from "@/drizzle/schema/space";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DeleteSpace } from "./components/DeleteSpace";

export default async function App() {
  const session = await auth();

  const ownerId = session?.user?.id;

  if (!ownerId) {
    notFound();
  }

  const spacesResult = await db
    .select()
    .from(spaces)
    .where(eq(spaces.ownerId, ownerId));

  console.log(spacesResult);

  return (
    <main className="px-12 py-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Spaces</h1>

        <Link href="/spaces/new">
          <Button>Add Space</Button>
        </Link>
      </div>
      <section>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
          {spacesResult.map((space) => {
            return (
              <li key={space.id}>
                <Card>
                  <CardTitle className="p-4">
                    <Link href={`/spaces/${space.id}`}>{space.name}</Link>
                  </CardTitle>
                  <CardContent>{space.description}</CardContent>
                  <CardFooter className="justify-end gap-4">
                    <Link
                      href={`/spaces/${space.id}/edit?name=${space.name}&description=${space.description}`}
                    >
                      <Button>Edit</Button>
                    </Link>
                    <DeleteSpace spaceId={space.id} />
                  </CardFooter>
                </Card>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
