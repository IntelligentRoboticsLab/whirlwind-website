import type { ReactNode } from "react";

type PageHeroMetric = {
  label: string;
  value: string;
};

type PageHeroProps = {
  title: ReactNode;
  description: ReactNode;
  metrics?: PageHeroMetric[];
  actions?: ReactNode;
  aside?: ReactNode;
};

export default function PageHero({
  title,
  description,
  metrics,
  actions,
  aside,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="site-container page-hero__grid">
        <div className="page-hero__content">
          <h1 className="page-hero__title">{title}</h1>
          <p className="page-hero__description">{description}</p>
          {actions ? <div className="page-hero__actions">{actions}</div> : null}
          {metrics?.length ? (
            <dl className="page-hero__metrics">
              {metrics.map((metric) => (
                <div key={metric.label} className="page-hero__metric">
                  <dt>{metric.label}</dt>
                  <dd>{metric.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
        {aside ? <div className="page-hero__aside">{aside}</div> : null}
      </div>
    </section>
  );
}
