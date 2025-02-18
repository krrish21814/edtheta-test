"use server";
import { schoolMethods } from "@/lib/services/schools";

type SchoolListServerProps = {
  latitude: number;
  longitude: number;
  radius: number;
  page: number;
  limit: number;
  amenities?: string[];
  minRatings?: number;
};
export default async function SchoolListServer(
  schoolListServerProps: SchoolListServerProps
) {
  const schoolsData = await schoolMethods.getNearby(
    schoolListServerProps.latitude,
    schoolListServerProps.longitude,
    schoolListServerProps.radius,
    {
      page: schoolListServerProps.page,
      limit: schoolListServerProps.limit,
      minRating: schoolListServerProps.minRatings,
      amenities: schoolListServerProps.amenities,
    }
  );

  return schoolsData;
}
