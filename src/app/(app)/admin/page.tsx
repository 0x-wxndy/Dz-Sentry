import { redirect } from "next/navigation";
import { AdminPortal } from "@/components/admin/admin-portal";
import { PageIntro } from "@/components/i18n/page-intro";
import { getCurrentUser } from "@/lib/auth/session";
import { getCurrentPlan } from "@/lib/auth/plan-session";
import { canAccessAdmin } from "@/lib/auth/rbac";
import { planAllows } from "@/lib/plans";

export default async function AdminPage() {
  const [user, plan] = await Promise.all([getCurrentUser(), getCurrentPlan()]);
  if (!canAccessAdmin(user.role) || !planAllows(plan, "admin")) {
    redirect(canAccessAdmin(user.role) ? "/settings?tab=billing" : "/dashboard");
  }

  return (
    <div className="space-y-6">
      <PageIntro page="admin" />
      <AdminPortal />
    </div>
  );
}
