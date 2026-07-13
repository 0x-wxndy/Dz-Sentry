/**
 * Demo auth — cookie-based role switching for client prototypes.
 * When Supabase Auth is configured, replace with real sessions;
 * the same `role` column gating still applies.
 */

import { cookies } from "next/headers";
import { DEMO_USERS } from "./rbac";
import type { DemoUser, UserRole } from "@/types";

export const DEMO_SESSION_COOKIE = "dz_sentry_demo_role";

export function getDemoUserFromRole(role: UserRole): DemoUser {
  return DEMO_USERS.find((u) => u.role === role) ?? DEMO_USERS[0];
}

export async function getCurrentUser(): Promise<DemoUser> {
  const jar = await cookies();
  const role = (jar.get(DEMO_SESSION_COOKIE)?.value as UserRole) || "standard";
  if (!DEMO_USERS.some((u) => u.role === role)) {
    return DEMO_USERS[0];
  }
  return getDemoUserFromRole(role);
}
