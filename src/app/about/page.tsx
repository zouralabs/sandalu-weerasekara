import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";

export const metadata = {
  title: "About",
  description:
    "Learn more about Sandalu Isiwara, educational resources, classes, books, and study accessories.",
};

export default function AboutPage() {
  return (
    <div className="page">
      <div className="container">
        <Breadcrumbs items={[{ label: "About" }]} />
      </div>
      <main className="about-story">
        <section className="container about-hero" aria-labelledby="about-page-title">
          <div className="about-hero-copy">
            <span className="eyebrow">ABOUT SANDALU ISIWARA</span>
            <h1 id="about-page-title">10+ Years of Teaching Excellence</h1>
            <p>
              Proven results and concept-driven learning. I have dedicated the
              past decade to helping students build confidence and reach their
              full academic potential.
            </p>
            <div className="about-hero-actions">
              <Link href="/classes" className="button primary">
                <GraduationCap size={18} />
                Explore classes
                <ArrowRight size={17} />
              </Link>
              <Link href="/books" className="button secondary">
                <BookOpen size={18} />
                Explore books
              </Link>
            </div>
          </div>
          <div className="about-hero-visual" aria-hidden="true">
            <Image
              src="/images/hero-educator.png"
              alt=""
              width={760}
              height={736}
              sizes="(max-width: 800px) 90vw, 45vw"
              priority
            />
          </div>
        </section>

        <section className="about-journey" aria-labelledby="about-journey-title">
          <div className="container">
            <header className="about-section-heading">
              <span className="eyebrow">THE JOURNEY</span>
              <h2 id="about-journey-title">A foundation built on learning</h2>
              <p>From academic achievement to a decade in the classroom.</p>
            </header>
            <ol className="about-timeline">
              <li>
                <span className="about-timeline-number">01</span>
                <div>
                  <h3>G.C.E. O/L</h3>
                  <p>Achieved 9 As at the O/L examinations.</p>
                </div>
              </li>
              <li>
                <span className="about-timeline-number">02</span>
                <div>
                  <h3>G.C.E. A/L</h3>
                  <p>Achieved 3 As at the A/L examinations.</p>
                </div>
              </li>
              <li>
                <span className="about-timeline-number">03</span>
                <div>
                  <h3>University of Colombo</h3>
                  <p>Gained admission to the University of Colombo.</p>
                </div>
              </li>
              <li>
                <span className="about-timeline-number">04</span>
                <div>
                  <h3>Teaching</h3>
                  <p>For the past decade, empowering students to reach their full academic potential.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="container about-approach" aria-labelledby="about-approach-title">
          <header className="about-section-heading">
            <span className="eyebrow">THE TEACHING APPROACH</span>
            <h2 id="about-approach-title">Understand deeply. Perform confidently.</h2>
            <p>
              Strong results grow from clear ideas, sound reasoning, and
              deliberate exam preparation.
            </p>
          </header>
          <div className="about-principles">
            <article>
              <span>01</span>
              <h3>Simplify complex concepts</h3>
              <p>Make difficult topics clear and approachable.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Build logical foundations</h3>
              <p>Develop reasoning that supports lasting understanding.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Master exam techniques</h3>
              <p>Turn preparation into confident performance.</p>
            </article>
          </div>
        </section>

        <section className="container about-next-step" aria-labelledby="about-next-title">
          <div>
            <span className="eyebrow">YOUR NEXT STEP</span>
            <h2 id="about-next-title">Ready to keep learning?</h2>
          </div>
          <div className="about-hero-actions">
            <Link href="/classes" className="button primary">
              Explore classes <ArrowRight size={17} />
            </Link>
            <Link href="/books" className="button secondary">
              Explore books <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
