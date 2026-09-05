// The team name, always with the IRL in orange (DESIGN.md, section 3).
// Use this wherever the name is rendered as text; alt text and metadata keep
// the plain string "whIRLwind".
export default function Name({ long = false }: { long?: boolean }) {
  return (
    <>
      wh<span className="irl">IRL</span>wind{long ? " Amsterdam" : ""}
    </>
  );
}
