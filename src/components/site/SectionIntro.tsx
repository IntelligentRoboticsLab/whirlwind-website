import type { ReactNode } from "react";

type SectionIntroProps = {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  compact?: boolean;
};

export default function SectionIntro({
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
        <h2 className="section-intro__title">{title}</h2>
        {description ? (
          <p className="section-intro__description">{description}</p>
        ) : null}
      </div>
      {action ? <div className="section-intro__action">{action}</div> : null}
    </div>
  );
}
