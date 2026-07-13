import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPercent(n: number, digits = 0) {
  return `${n.toFixed(digits)}%`;
}

export function riskColor(level: "green" | "yellow" | "red") {
  switch (level) {
    case "green":
      return "text-risk-green";
    case "yellow":
      return "text-risk-yellow";
    case "red":
      return "text-risk-red";
  }
}

export function riskBg(level: "green" | "yellow" | "red") {
  switch (level) {
    case "green":
      return "bg-risk-green/15 border-risk-green/40";
    case "yellow":
      return "bg-risk-yellow/15 border-risk-yellow/40";
    case "red":
      return "bg-risk-red/15 border-risk-red/40";
  }
}
