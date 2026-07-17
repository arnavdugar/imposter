import { Button } from "../../common/components/Button";
import { GameStep } from "../../common/components/GameStep";
import { useGame } from "../hooks/useGame";

import * as styles from "./DiscussionPage.css";

export function DiscussionPage() {
  const game = useGame();

  return (
    <GameStep
      actions={
        <Button onClick={game.startVoting} type="button">
          Start hidden voting
        </Button>
      }
      beforeTitle={
        <span aria-hidden="true" className={styles.sunIcon}>
          <span className={`material-symbols-outlined ${styles.sunIconGlyph}`}>
            light_mode
          </span>
        </span>
      }
      description="Start the narrator's day timer. Share information, bluff, and reconstruct how the roles moved during the night."
      title="Day phase"
    />
  );
}
