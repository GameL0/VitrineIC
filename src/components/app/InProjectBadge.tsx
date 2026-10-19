import { StatusPill } from "./StatusPill";
import { RED } from "@/styles/tokens";

/** Selo "em projeto" que o estudante marca quando está alocado. */
export function InProjectBadge() {
  return <StatusPill color={RED}>Em projeto</StatusPill>;
}
