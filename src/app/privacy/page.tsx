import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Sandalu Isiwara handles information submitted through the website, cart, and enquiries.",
};

export default function PrivacyPage() {
  return (
    <div className="container page legal-page">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <SectionHeader
        page
        eyebrow="YOUR INFORMATION"
        title="Privacy Policy"
        description="This policy explains what information is used when you browse, contact us, request a class place, or prepare an order."
      />
      <p className="legal-updated">Last updated: 7 November 2026</p>

      <div className="legal-content">
        <section>
          <h2>Information you provide</h2>
          <p>
            The contact form may ask for your name, phone number, inquiry type,
            and message. The class-enrollment form asks for the student’s name,
            contact number and email, a parent’s name and contact number, home
            address, selected class, and any optional message.
          </p>
          <p>
            When you submit either form, the information is sent to Web3Forms
            for delivery to Sandalu Isiwara. The website itself does not keep
            form submissions in an application database. Web3Forms processes
            the submission as a third-party service and its own privacy terms
            apply to that processing.
          </p>
        </section>

        <section>
          <h2>Cart and WhatsApp orders</h2>
          <p>
            Your cart is saved in this browser’s local storage so it remains
            available when you return on the same browser. It contains product
            identifiers and quantities, not your name, address, or payment
            details. You can remove items in the cart or clear this browser’s
            stored site data.
          </p>
          <p>
            Choosing an order button opens WhatsApp with a prepared message
            containing your selected items and quantities. It does not send the
            message automatically. Review and edit it before choosing to send;
            once sent, the information is handled by WhatsApp and the recipient
            under their respective policies.
          </p>
        </section>

        <section>
          <h2>How information is used</h2>
          <p>
            Information submitted through the forms is used to respond to your
            inquiry or enrollment request. Order details are used to discuss
            availability, delivery, and payment arrangements. This website does
            not create customer accounts or process online payments, and it
            does not ask you to enter card or banking credentials.
          </p>
        </section>

        <section>
          <h2>Storage, cookies, and other services</h2>
          <p>
            Cart information remains in your browser’s local storage until you
            remove it or clear the browser data. Form information is transmitted
            to Web3Forms and may be delivered to the site owner; the website
            does not set a retention period for information held by that
            provider or in subsequent communications. Please review the
            provider’s own privacy information for its practices.
          </p>
          <p>
            The site does not currently implement analytics or advertising
            tracking. External services and links, including Web3Forms and
            WhatsApp, operate under their own privacy policies and may handle
            data differently from this website.
          </p>
        </section>

        <section>
          <h2>Students and families</h2>
          <p>
            Class requests can include information about students and parents.
            If a student is under 18, a parent or guardian should review and
            assist with the enrollment request. Please provide only information
            needed to respond to your request.
          </p>
        </section>

        <section>
          <h2>Your choices and questions</h2>
          <p>
            You may choose not to submit a form or send a WhatsApp message.
            You can clear the locally stored cart using your browser settings.
            To ask about or request correction or deletion of information you
            have submitted to us, contact us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Information held
            by a third-party service may also need to be managed through that
            service.
          </p>
        </section>

        <section>
          <h2>Changes and contact</h2>
          <p>
            We may update this policy when the website or its data practices
            change. The latest revision date will appear at the top of this
            page. For privacy questions, email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
