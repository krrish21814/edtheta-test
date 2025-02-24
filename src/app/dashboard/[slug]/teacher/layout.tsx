import { AdminNav } from "@/components/dashboard/admin/admin-nav";
import { MobileMenu } from "@/components/dashboard/admin/mobile-nav";
import { getCurrentUser } from "@/utils/authentication";
import { redirect } from "next/navigation";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //  const user = await getCurrentUser();
  // if (!user || user.role !== "admin") {
  //   redirect("/login");
  // }

  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminNav role='teacher' />
      <MobileMenu role='teacher' />
      <main className='lg:ml-64 pt-16 lg:pt-0'>{children}</main>
    </div>
  );
}
