"use server";
import { userMethods } from "@/lib/services/user";

export default async function VerifyTokenAction(token: string) {
  const userData = await userMethods.verify(token);

  return userData;
}
