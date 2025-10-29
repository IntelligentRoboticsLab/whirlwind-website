import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Team whIRLwind",
  description: "Get in touch with Team whIRLwind.",
};

export default function ContactPage() {
  return (
    <section className="pb-20 pt-10 sm:pb-32 sm:pt-12">
      <div className="mx-auto w-full max-w-[1120px] px-8 sm:px-10 lg:px-12 xl:px-4">
        <h1 className="mb-3 mt-0 text-[clamp(1.8rem,2.5vw,2.4rem)]">
          Contact
        </h1>
        <p className="mb-8 mt-0 text-(--ink-muted)">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a sem
          sit amet nulla placerat tincidunt in in nunc.
        </p>
      </div>
    </section>
  );
}
