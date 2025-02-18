"use server";
import { userMethods } from "@/lib/services/user";

export default async function RegisterAction(formData: FormData) {
  const userData = await userMethods.create(formData);

  return userData;
}
