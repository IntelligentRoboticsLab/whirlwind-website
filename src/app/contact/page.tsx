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

        <div className="row">
          <form
            className="form panel"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Contact form"
          >
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" placeholder="Jane Doe" className="input" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="jane@example.com"
                className="input"
              />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Lorem ipsum dolor sit amet..."
                className="textarea"
              />
            </div>
            <div>
              <button className="btn" type="submit">
                Send message
              </button>
            </div>
          </form>

          <aside className="panel" style={{ flex: 1, minWidth: 280 }}>
            <h3 style={{ marginTop: 0 }}>Details</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="meta">team@whirlwind.example</p>
            <p className="meta">Amsterdam, NL</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
