import type { TuitionClass } from "@/types";

export function getLocalizedClassTitle(item: TuitionClass) {
  return item.title;
}

export function getLocalizedClassDescription(item: TuitionClass) {
  return item.description;
}

export function getLocalizedClassSchedule(item: TuitionClass) {
  return item.schedule;
}

export function getLocalizedClassLocation(item: TuitionClass) {
  return item.location;
}

export function getLocalizedMedium(item: TuitionClass) {
  return item.medium === "Sinhala" ? "සිංහල මාධ්‍ය" : "English Medium";
}
