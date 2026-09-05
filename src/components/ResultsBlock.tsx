import type { Competition } from "@/lib/seasons";
import Score from "./Score";

// Every match of a competition, in the order played, ours first
// (DESIGN.md, section 9, "Results block").
export default function ResultsBlock({ competition }: { competition: Competition }) {
  if (!competition.matches?.length) return null;
  return (
    <section className="results-block" aria-labelledby={`results-${competition.id}`}>
      <h2 id={`results-${competition.id}`} className="t-heading">
        Results
      </h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Stage</th>
            <th scope="col">Opponent</th>
            <th scope="col" className="num">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {competition.matches.map((m, i) => (
            <tr key={i}>
              <td>{m.stage}</td>
              <td>
                {m.opponent}
                {m.note ? <span className="t-meta"> {m.note}</span> : null}
              </td>
              <td className="num">
                <Score us={m.us} them={m.them} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
