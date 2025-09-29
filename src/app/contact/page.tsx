import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Team whIRLwind",
  description: "Get in touch with Team whIRLwind.",
};

export default function ContactPage() {
  return (
    <section className="page">
      <div className="container">
        <h1>Contact</h1>
        <p className="lead">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a sem
          sit amet nulla placerat tincidunt in in nunc.
        </p>
      </div>
    </section>
  );
}
