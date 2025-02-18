"use server";
import { schoolMethods } from "@/lib/services/schools";

export default async function SchoolProfileGetAction(schoolSlug: string) {
  const schoolsData = await schoolMethods.getBySlug(schoolSlug);

  return schoolsData;
}
