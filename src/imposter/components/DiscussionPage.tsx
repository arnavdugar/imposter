import { Button } from "../../common/components/Button";
import { GameStep } from "../../common/components/GameStep";
import { useGame } from "../hooks/useGame";
import { ClueHistory } from "./ClueHistory";

import * as styles from "./DiscussionPage.css";

export function DiscussionPage() {
  const game = useGame();

  return (
    <GameStep
      actions={
        <>
          <Button onClick={game.startVoting} type="button">
            Start hidden voting
          </Button>
          <Button onClick={game.continueGame} type="button" variant="secondary">
            Take another clue round
          </Button>
        </>
      }
      description="Compare wording, timing, and repeated ideas before anyone votes."
      title="Discuss the clues"
    >
      <div className={styles.playerList}>
        {game.activePlayers.map((player) => (
          <article className={styles.playerCard} key={player.id}>
            <ClueHistory
              clues={game.clues[player.id] ?? []}
              name={player.name}
            />
          </article>
        ))}
      </div>
    </GameStep>
  );
}
