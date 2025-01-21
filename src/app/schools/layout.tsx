import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getCurrentUser } from "@/lib/auth";

export default async function SchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // if (!user || user.role !== "admin") {
  //   redirect("/login");
  // }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main className=''>{children}</main>
      <Footer />
    </div>
  );
}
