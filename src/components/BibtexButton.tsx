import CopyButton from "./CopyButton";
import { type IPublication, toBibtex } from "@/lib/publications/publication";

// Copies the BibTeX entry of a publication. The label stays "BibTeX"; see
// CopyButton for the copy behaviour.
export default function BibtexButton({
  publication,
}: {
  publication: IPublication;
}) {
  return (
    <CopyButton text={toBibtex(publication)} ariaLabel="Copy BibTeX citation">
      BibTeX
    </CopyButton>
  );
}
