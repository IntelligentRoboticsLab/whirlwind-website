// A match score, ours first, in the scoreboard numerals with an orange colon.
export default function Score({ us, them }: { us: number; them: number }) {
  return (
    <span className="t-score">
      {us}
      <span className="colon">:</span>
      {them}
    </span>
  );
}
