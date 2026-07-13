import { redirect } from "next/navigation";
import { AdminPortal } from "@/components/admin/admin-portal";
import { PageIntro } from "@/components/i18n/page-intro";
import { getCurrentUser } from "@/lib/auth/session";
import { canAccessAdmin } from "@/lib/auth/rbac";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!canAccessAdmin(user.role)) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6">
      <PageIntro page="admin" />
      <AdminPortal />
    </div>
  );
}
