import Link from "next/link";

type LinkButtonProps = {
  href: string;
  label: string;
  onNavigate?: () => void;
  className?: string;
  ariaLabel?: string;
  bordered?: boolean;
};

export default function LinkButton({
  href,
  label,
  onNavigate,
  className,
  ariaLabel,
  bordered = false,
}: LinkButtonProps) {
  const classes = ["nav-link"];

  if (bordered) {
    classes.push("nav-link--bordered");
  }

  if (className) {
    classes.push(className);
  }

  return (
    <Link
      href={href}
      className={classes.join(" ")}
      onClick={onNavigate}
      aria-label={ariaLabel}
    >
      <span aria-hidden="true" className="nav-link__spark" />
      <span aria-hidden="true" className="nav-link__backdrop" />
      <span className="nav-link__label">{label}</span>
    </Link>
  );
}
