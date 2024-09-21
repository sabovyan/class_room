import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AppPage() {
  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>
            <Link href="/spaces">Spaces</Link>
          </CardTitle>
        </CardHeader>
      </Card>
    </main>
  );
}
