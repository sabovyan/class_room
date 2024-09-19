"use server";

import { auth } from "@/auth";
import { db } from "@/drizzle/db";
import { spaces } from "@/drizzle/schema/space";
import type { ActionReturnType } from "@/types/action";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as v from "valibot";

const createspaceSchema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, "The name must be at least 3 characters long"),
  ),
  description: v.string(),
});

const editSpaceSchema = v.object({
  ...createspaceSchema.entries,
  id: v.number(),
});

// add separate functions to guard and validate

export const addSpace = async (
  formData: FormData,
): Promise<
  ActionReturnType<{ name: string; description?: string }> | never
> => {
  "use server";

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const name = formData.get("name");
  const description = formData.get("description");

  const validation = v.safeParse(createspaceSchema, { name, description });

  console.log({ validation: validation.issues });

  if (validation.success === false) {
    return {
      status: "error",
      field: validation.issues[0].path?.[0].key as string,
      message: validation.issues[0].message,
    };
  }

  await db
    .insert(spaces)
    .values({
      ...validation.output,
      ownerId: session.user.id,
    })
    .returning();

  redirect("/app/spaces");
};

export const editSpace = async (formData: FormData) => {
  "use server";

  const name = formData.get("name") as string | undefined;
  const description = formData.get("description") as string | undefined;
  const id = Number(formData.get("id")) as number | undefined;

  const validation = v.safeParse(editSpaceSchema, { name, description, id });

  if (validation.success === false) {
    return {
      status: "error",
      message: validation.issues[0].message,
    };
  }

  await db
    .update(spaces)
    .set({ name, description })
    .where(eq(spaces.id, validation.output.id));

  redirect("/app/spaces");
};

export const deleteSpace = async (formData: FormData) => {
  "use server";
  const formId = Number(formData.get("id")) as number | undefined;

  const NumberSchema = v.number();

  const validation = v.safeParse(NumberSchema, formId);

  if (validation.success === false) {
    return { status: "error", message: "Not valid Id" };
  }

  const id = validation.output;

  await db.delete(spaces).where(eq(spaces.id, id));

  revalidatePath("app/spaces");
};
