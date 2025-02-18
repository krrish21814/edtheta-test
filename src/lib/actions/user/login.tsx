"use server";
import { userMethods } from "@/lib/services/user";

export default async function LoginAction(formData: FormData) {
  const userData = await userMethods.login(formData);

  return userData;
}
