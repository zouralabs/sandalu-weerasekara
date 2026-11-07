import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the terms for using the Sandalu Isiwara website, placing book enquiries, and requesting class enrollment.",
};

export default function TermsPage() {
  return (
    <div className="container page legal-page">
      <Breadcrumbs items={[{ label: "Terms of Use" }]} />
      <SectionHeader
        page
        eyebrow="USING THIS SITE"
        title="Terms of Use"
        description="These terms describe how the website’s catalogues, order enquiries, and class requests work."
      />
      <p className="legal-updated">Last updated: 7 November 2026</p>

      <div className="legal-content">
        <section>
          <h2>Using the website</h2>
          <p>
            This website provides information about educational books, study
            accessories, and classes offered by Sandalu Isiwara. By using the
            site, you agree to use it lawfully and not interfere with its
            operation or submit misleading information.
          </p>
        </section>

        <section>
          <h2>Products, prices, and availability</h2>
          <p>
            Product descriptions, images, prices, and stock status are provided
            for reference and may change. The final price, availability, and
            any delivery charge will be confirmed directly before an order is
            accepted. Amounts shown on the site are in Sri Lankan rupees unless
            stated otherwise.
          </p>
        </section>

        <section>
          <h2>Orders and payment</h2>
          <p>
            The cart prepares an order message and opens WhatsApp when you
            choose the order link. You can review or edit the message before
            sending it. Adding an item to the cart or opening WhatsApp does not
            itself place or confirm an order. The order is subject to direct
            confirmation of availability, total cost, delivery, and payment
            arrangements.
          </p>
          <p>
            This website does not accept online payment or collect payment-card
            details. Do not send card PINs, passwords, or other payment
            credentials through the website or an enquiry message. Ask about
            applicable cancellation, return, or refund terms before completing
            payment; any rights that cannot be excluded by law remain
            unaffected.
          </p>
        </section>

        <section>
          <h2>Classes and enrollment requests</h2>
          <p>
            Class details such as fees, schedule, format, and commencement date
            may change and should be confirmed before enrollment. Sending the
            enrollment form is a request, not a guarantee of a place. Enrollment
            is confirmed only after direct communication from the class
            provider. Any class-specific arrangements will be communicated
            separately.
          </p>
        </section>

        <section>
          <h2>Enquiries and third-party services</h2>
          <p>
            Contact and enrollment forms are processed through Web3Forms. Book
            order messages are handed off to WhatsApp only when you choose to
            open the prepared message. Those services and any linked websites
            are operated by third parties and are subject to their own terms and
            policies.
          </p>
        </section>

        <section>
          <h2>Website content</h2>
          <p>
            Website text, branding, and original materials may be protected by
            intellectual-property rights. Do not reproduce or commercially use
            them without permission from the relevant rights holder, except as
            allowed by law.
          </p>
        </section>

        <section>
          <h2>Accuracy and liability</h2>
          <p>
            We aim to keep the website information current, but do not guarantee
            that every listing is complete, error-free, or continuously
            available. Educational content is informational and does not
            guarantee a particular academic result. To the extent permitted by
            applicable law, the website is provided without a guarantee of
            uninterrupted service. Nothing in these terms limits rights or
            liability that cannot lawfully be limited.
          </p>
        </section>

        <section>
          <h2>Changes and contact</h2>
          <p>
            These terms may be updated as the site or services change. The
            current version and revision date will be shown on this page. For
            questions, contact <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
