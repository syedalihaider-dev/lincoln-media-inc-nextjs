import Animatic from "../kit/Animatic";
import Board from "../kit/Board";

// The service's own working artefact, by kind (set in each page's data)
export default function Artefact({ kind, page, compact = false }) {
  if (kind === "animatic") return <Animatic data={page.animatic} compact={compact} />;
  if (kind === "board") return <Board data={page.board} compact={compact} />;
  return null;
}
