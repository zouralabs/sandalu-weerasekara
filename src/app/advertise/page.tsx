import {
  BookOpen,
  UserRound,
  CalendarDays,
  Megaphone,
  LayoutPanelTop,
} from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { SectionHeader } from "@/components/common/SectionHeader";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { advertiseMessage } from "@/lib/whatsapp";
import { site } from "@/config/site";
export const metadata = {
  title: "Advertise Your Tuition Classes",
  description:
    "Ask about class listings, teacher profiles, seminar promotions and featured advertisements.",
};
const options = [
  {
    icon: BookOpen,
    title: "Tuition class listings",
    text: "Present your subject, medium, location and weekly schedule in a searchable directory.",
  },
  {
    icon: Megaphone,
    title: "Featured advertisements",
    text: "Ask about featured placement for a class or revision program.",
  },
  {
    icon: UserRound,
    title: "Teacher profiles",
    text: "Bring your subjects, biography and available classes together in one profile.",
  },
  {
    icon: CalendarDays,
    title: "Seminar promotions",
    text: "Share event dates, venues and information students need before attending.",
  },
  {
    icon: LayoutPanelTop,
    title: "Homepage banners",
    text: "Ask about promotional banner space for your educational program.",
  },
];
export default function Page() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: "Advertise With Us" }]} />
      <section className="advertise-intro">
        <SectionHeader
          page
          title="Advertise your tuition classes."
          eyebrow="CONNECT WITH YOUR NEXT STUDENTS"
          description="Promote your tuition classes, seminars and educational programs to students across Sri Lanka."
        />
        <WhatsAppButton message={advertiseMessage} className="button primary">
          Advertise via WhatsApp
        </WhatsAppButton>
        <p className="small muted">
          Contact us for current options, availability and advertising terms.
        </p>
      </section>
      <section className="section">
        <SectionHeader
          title={`Your teaching. A place on ${site.name}.`}
          description="Choose the type of listing that fits your program."
        />
        <div className="advertising-options">
          {options.map((option) => (
            <article key={option.title}>
              <option.icon size={26} />
              <h3>{option.title}</h3>
              <p>{option.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <SectionHeader title="How it works" />
        <ol className="steps">
          {[
            [
              "Start a conversation",
              "Contact us on WhatsApp and tell us about your class or program.",
            ],
            [
              "Send your details",
              "Share the information below along with a clear promotional poster.",
            ],
            [
              "Review and publish",
              "We review the material, confirm arrangements with you and publish the advertisement.",
            ],
          ].map(([title, text], i) => (
            <li key={title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="requirements">
        <SectionHeader
          title="Have these details ready"
          description="A complete listing helps students understand your class before they inquire."
        />
        <ul>
          {[
            "Teacher name",
            "Subject and grade",
            "Teaching medium",
            "District and class location",
            "Class type and weekly schedule",
            "Contact information",
            "Promotional poster",
            "Additional class details",
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <WhatsAppButton message={advertiseMessage}>
          Send an advertising inquiry
        </WhatsAppButton>
      </section>
    </div>
  );
}
