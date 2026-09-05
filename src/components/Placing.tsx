// A finishing position in the wordmark's slant: "3rd place", "QF quarter-finals".
export default function Placing({ figure, word }: { figure: string; word: string }) {
  return (
    <span className="t-result result__place">
      {figure}
      <small>{word}</small>
    </span>
  );
}
