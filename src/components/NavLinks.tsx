import LinkButton from "./LinkButton";

type NavLinksProps = {
  onNavigate?: () => void;
};

const navLinks = [
  { href: "/publications", label: "Publications" },
  { href: "/socials", label: "Socials" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function NavLinks({ onNavigate }: NavLinksProps) {
  return (
    <ul className="nav-list">
      {navLinks.map((link) => (
        <li key={link.href}>
          <LinkButton
            href={link.href}
            label={link.label}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}
