"use server";
import { getCurrentUser } from "@/utils/authentication";
import { redirect } from "next/navigation";

export default async function UserGetAction() {
  const userData = await getCurrentUser();
  if (userData === null) {
    redirect("/schools");
  }
  return userData;
}
