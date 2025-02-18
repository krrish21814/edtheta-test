"use server";
import { schoolMethods } from "@/lib/services/schools";

export default async function FacultyStatsAction(schoolSlug: string) {
  const facultStatsData = await schoolMethods.getFacultyStats(schoolSlug);

  return facultStatsData;
}
