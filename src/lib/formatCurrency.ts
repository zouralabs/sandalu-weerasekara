import { site } from "@/config/site";
export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: site.currency,
    maximumFractionDigits: 0,
  }).format(value);
