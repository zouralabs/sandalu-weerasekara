import { Cart } from "@/components/cart/Cart";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
export const metadata = {
  title: "Your Shopping Cart",
  description: "Review your books and prepare a WhatsApp order.",
  robots: { index: false, follow: true },
};
export default function Page() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Your cart" }]} />
      <SectionHeader
        page
        title="Your cart"
        description="A few steps closer to your next chapter."
      />
      <Cart />
    </div>
  );
}
