import { site } from "@/config/site";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { ContactForm } from "@/components/common/ContactForm";
export const metadata = {
  title: "Contact Us",
  description:
    "Contact the store about book orders, classes, seminars or advertising.",
};
export default function Page() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Contact Us" }]} />
      <SectionHeader
        page
        title="Let’s help you take the next step."
        eyebrow="CONTACT US"
        description="A question about a book, a class or advertising? Start a conversation."
      />
      <div className="contact-layout">
        <div className="contact-info">
          <h2>Talk to {site.name}</h2>
          <p>{site.description}</p>
          <WhatsAppButton message="Hello, I would like some help with a book, tuition class or advertising inquiry.">
            Contact via WhatsApp
          </WhatsAppButton>
          {site.telephone && (
            <p>
              <a href={`tel:${site.telephone}`}>{site.telephone}</a>
            </p>
          )}
          {site.email && (
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          )}
          {site.address && <p>{site.address}</p>}
          {!site.telephone && !site.email && (
            <p className="info-note">
              Business contact details have not yet been configured in this
              demo. You can still prepare and copy your inquiry.
            </p>
          )}
          <h3>Ordering books?</h3>
          <p>
            Use the cart to include book titles, quantities and totals in one
            message. Delivery charges and payment arrangements are confirmed
            directly by the store.
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
