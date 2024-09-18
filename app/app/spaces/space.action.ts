"use server";

import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { spaces } from "@/drizzle/schema/space";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as v from "valibot";

export const addSpace = async (formData: FormData) => {
  "use server";

  const session = await auth();

  if (!session?.user) {
    return new Response("Not logged in", { status: 401 });
  }

  const name = formData.get("name") as string | undefined;
  const description = formData.get("description") as string | undefined;

  if (!name) {
    return new Response("Name is required", { status: 400 });
  }

  await db
    .insert(spaces)
    .values({
      name,
      description,
      ownerId: session.user.id as string,
    })
    .returning();

  redirect("/app/spaces");
};

export const deleteSpace = async (formData: FormData) => {
  "use server";
  const formId = Number(formData.get("id")) as number | undefined;

  const NumberSchema = v.number();

  const validation = v.safeParse(NumberSchema, formId);

  console.log({ validation });

  if (validation.success === false) {
    return { status: "error", message: "Not valid Id" };
  }

  const id = validation.output;

  await db.delete(spaces).where(eq(spaces.id, id));

  revalidatePath("app/spaces");
};
