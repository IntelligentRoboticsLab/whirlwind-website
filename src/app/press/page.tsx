import type { Metadata } from "next";
import Image from "next/image";

import Opener from "@/components/Opener";
import Name from "@/components/Name";
import PhotoGrid from "@/components/PhotoGrid";
import { galleryPhotos } from "@/lib/photos";
import { siteContact } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Boilerplate, the official logo files and photographs of whIRLwind for press use.",
};

// The official logo kit, verbatim, under public/press. Each entry is one
// drawing in one colourway, in the kit's three formats. DESIGN.md, section 3.
const logoFiles = [
  {
    file: "whirlwind-full-logo",
    label: "Full logo for light backgrounds",
    alt: "whIRLwind full logo, indigo and orange",
    ground: "light",
    width: 383,
    height: 139,
  },
  {
    file: "whirlwind-full-logo-white",
    label: "Full logo for dark backgrounds",
    alt: "whIRLwind full logo, white and orange",
    ground: "dark",
    width: 383,
    height: 139,
  },
  {
    file: "whirlwind-logo",
    label: "Logo for light backgrounds",
    alt: "whIRLwind logo, indigo and orange",
    ground: "light",
    width: 157,
    height: 139,
  },
  {
    file: "whirlwind-logo-white",
    label: "Logo for dark backgrounds",
    alt: "whIRLwind logo, white and orange",
    ground: "dark",
    width: 157,
    height: 139,
  },
] as const;

const formats = ["svg", "png", "eps"] as const;

export default function PressPage() {
  return (
    <div className="page">
      <section className="container opening" aria-label="Introduction">
        <div className="opening__text">
          <h1 className="t-title">Press</h1>
          <p className="t-lede">
            What you need to write about us: a paragraph describing us, our team logo, and photographs you are allowed to use with the credit shown. For anything else, email{" "}
            <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>.
          </p>
        </div>
      </section>

      <section
        className="container section"
        aria-labelledby="boilerplate-heading"
      >
        <Opener
          id="boilerplate-heading"
          title={
            <>
              About <Name />
            </>
          }
          artwork="k1-dribble"
          at={74}
        />
        <div className="prose t-body">
          <p>
            <Name /> is the humanoid robotics team of the Intelligent Robotics Lab at the University of Amsterdam. The team is run by bachelor and master students and competes as one of the top teams in the RoboCup Humanoid Soccer League's middle-sized division, with Booster Robotics' K1 robots and a fully custom software stack (the "brain" of the robots). In 2026 it finished 3rd at the World Humanoid Robot Games in Beijing, 4th at RoboCup 2026 in Incheon, and 3rd at the RoboCup German Open in Cologne. The team grew
            out of the Dutch Nao Team, which played in the former RoboCup Standard Platform League.
          </p>
          <p className="t-meta">
            The name is written <Name />, with IRL in capitals. IRL stands for
            Intelligent Robotics Lab.
          </p>
        </div>
      </section>

      <section className="container section" aria-labelledby="logos-heading">
        <div className="section-head">
          <h2 id="logos-heading" className="t-heading">
            Logo files
          </h2>
          <p className="t-body">
            The full logo and the logo alone, each in a version for light and
            for dark backgrounds. Do not recolour, rotate, stretch or place them
            on a photograph. Everything below is also in one archive:{" "}
            <a href="/press/whirlwind-logo-kit.zip" download>
              the logo kit (ZIP, 3.8 MB)
            </a>
            .
          </p>
        </div>
        <div className="downloads">
          {logoFiles.map((logo) => (
            <div key={logo.file} className="download">
              <div
                className={`download__preview download__preview--${logo.ground}`}
              >
                <Image
                  src={`/press/${logo.file}.svg`}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                />
              </div>
              <p className="t-body">{logo.label}</p>
              <div className="download__links t-body">
                {formats.map((format) => (
                  <a
                    key={format}
                    href={`/press/${logo.file}.${format}`}
                    download
                  >
                    {format.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container section" aria-labelledby="photos-heading">
        <div className="section-head">
          <h2 id="photos-heading" className="t-heading">
            Gallery
          </h2>
          <p className="t-body">
            Competitions, demos and visits. Open a photograph for
            its caption, the credit and the full-resolution file. Where no
            photographer is named, credit <Name /> Amsterdam.
          </p>
        </div>
        <PhotoGrid photos={galleryPhotos} />
      </section>
    </div>
  );
}
