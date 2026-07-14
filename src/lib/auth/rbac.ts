import type { DemoUser, UserRole } from "@/types";

export const DEMO_USERS: DemoUser[] = [
  {
    id: "u-standard",
    email: "analyst@dz-sentry.demo",
    name: "Nora Analyst",
    role: "standard",
  },
  {
    id: "u-vvip",
    email: "vvip@dz-sentry.demo",
    name: "Karim VVIP",
    role: "vvip",
  },
  {
    id: "u-sovereign",
    email: "sovereign@dz-sentry.demo",
    name: "Amina Sovereign",
    role: "sovereign",
  },
  {
    id: "u-admin",
    email: "admin@dz-sentry.demo",
    name: "Yacine Admin",
    role: "admin",
  },
];

/** Shared demo password for all test accounts */
export const DEMO_PASSWORD = "demo1234";

export function findDemoUserByEmail(email: string): DemoUser | undefined {
  return DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
}

export const ROLE_ACCESS: Record<
  UserRole,
  {
    scenarios: boolean;
    classifiedLayer: boolean;
    admin: boolean;
    label: string;
  }
> = {
  standard: {
    scenarios: false,
    classifiedLayer: false,
    admin: false,
    label: "Standard Analyst",
  },
  vvip: {
    scenarios: true,
    classifiedLayer: false,
    admin: false,
    label: "VVIP",
  },
  sovereign: {
    scenarios: true,
    classifiedLayer: true,
    admin: false,
    label: "Sovereign",
  },
  admin: {
    scenarios: true,
    classifiedLayer: true,
    admin: true,
    label: "Admin",
  },
};

export function canAccessScenarios(role: UserRole) {
  return ROLE_ACCESS[role].scenarios;
}

export function canSeeClassified(role: UserRole) {
  return ROLE_ACCESS[role].classifiedLayer;
}

export function canAccessAdmin(role: UserRole) {
  return ROLE_ACCESS[role].admin;
}
