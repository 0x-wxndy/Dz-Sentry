import { redirect } from "next/navigation";

/** Billing moved under Settings → Plan & billing */
export default function PricingRedirect() {
  redirect("/settings?tab=billing");
}
