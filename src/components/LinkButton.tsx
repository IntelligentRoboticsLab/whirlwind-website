import Link from "next/link";

type LinkButtonProps = {
  href: string;
  label: string;
  onNavigate?: () => void;
  className?: string;
  ariaLabel?: string;
  variant?: "nav" | "primary" | "secondary" | "inline";
  active?: boolean;
};

export default function LinkButton({
  href,
  label,
  onNavigate,
  className,
  ariaLabel,
  variant = "nav",
  active = false,
}: LinkButtonProps) {
  const classes = [
    "link-button",
    `link-button--${variant}`,
    active ? "is-active" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href={href}
      className={classes}
      onClick={onNavigate}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
    >
      <span className="link-button__label">{label}</span>
    </Link>
  );
}
