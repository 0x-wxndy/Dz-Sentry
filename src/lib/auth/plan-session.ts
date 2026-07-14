import { cookies } from "next/headers";
import {
  DEFAULT_PLAN,
  PLAN_COOKIE,
  isPlanId,
  type PlanId,
} from "@/lib/plans";

export async function getCurrentPlan(): Promise<PlanId> {
  const jar = await cookies();
  const raw = jar.get(PLAN_COOKIE)?.value;
  return isPlanId(raw) ? raw : DEFAULT_PLAN;
}
