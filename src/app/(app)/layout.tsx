import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUser } from "@/lib/auth/session";
import { getCurrentPlan } from "@/lib/auth/plan-session";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, plan] = await Promise.all([getCurrentUser(), getCurrentPlan()]);
  return (
    <AppShell user={user} plan={plan}>
      {children}
    </AppShell>
  );
}
