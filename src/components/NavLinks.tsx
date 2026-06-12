import LinkButton from "./LinkButton";

type NavLinksProps = {
  onNavigate?: () => void;
  currentPath: string;
};

const navLinks = [
  { href: "/#team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/publications", label: "Publications" },
  { href: "/socials", label: "Socials" },
  { href: "/sponsors", label: "Sponsors" },
];

export default function NavLinks({ onNavigate, currentPath }: NavLinksProps) {
  return (
    <ul className="nav-list">
      {navLinks.map((link) => (
        <li key={link.href}>
          <LinkButton
            href={link.href}
            label={link.label}
            onNavigate={onNavigate}
            active={!link.href.startsWith("/#") && currentPath.startsWith(link.href)}
          />
        </li>
      ))}
    </ul>
  );
}
