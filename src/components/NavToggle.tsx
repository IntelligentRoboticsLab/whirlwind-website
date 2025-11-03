type NavToggleProps = {
  open: boolean;
  onToggle: () => void;
};

export default function NavToggle({ open, onToggle }: NavToggleProps) {
  return (
    <button
      type="button"
      className="nav-toggle"
      aria-expanded={open}
      aria-controls="primary-navigation"
      aria-label={open ? "Close navigation" : "Open navigation"}
      onClick={onToggle}
    >
      <span className="nav-toggle__icon" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </button>
  );
}
