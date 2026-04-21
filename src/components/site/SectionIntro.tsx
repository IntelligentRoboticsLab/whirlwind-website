import type { ReactNode } from "react";

type SectionIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
};

export default function SectionIntro({
  eyebrow,
  title,
  description,
  action,
  compact = false,
}: SectionIntroProps) {
  return (
    <div
      className={`section-intro${compact ? " section-intro--compact" : ""}`}
    >
      <div className="section-intro__copy">
        <span className="section-intro__eyebrow">{eyebrow}</span>
        <h2 className="section-intro__title">{title}</h2>
        {description ? (
          <p className="section-intro__description">{description}</p>
        ) : null}
      </div>
      {action ? <div className="section-intro__action">{action}</div> : null}
    </div>
  );
}
