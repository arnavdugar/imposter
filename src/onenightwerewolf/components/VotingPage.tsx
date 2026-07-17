import { Button } from "../../common/components/Button";
import { GameStep } from "../../common/components/GameStep";
import { Progress } from "../../common/components/Progress";
import { useGame } from "../hooks/useGame";

import * as styles from "./VotingPage.css";

export function VotingPage() {
  const game = useGame();
  const player = game.currentVotePlayer;
  if (!player) return null;

  if (!game.voteVisible) {
    return (
      <>
        <GameStep
          actions={
            <Button onClick={() => game.setVoteVisible(true)} type="button">
              Choose my vote
            </Button>
          }
          description="Each player votes privately. Do not show your choice to anyone else."
          title={<>Pass to {player.name}</>}
        />
        <Progress
          completed={game.voteIndex}
          phase="voting"
          total={game.players.length}
        />
      </>
    );
  }

  return (
    <>
      <GameStep
        actions={
          <Button
            disabled={!game.pendingVote}
            onClick={game.submitVote}
            type="button"
          >
            Vote
          </Button>
        }
        description="Pick one other player. Two or more votes are needed for an elimination; everyone tied for the most votes is eliminated."
        title={<>{player.name}, choose a suspect</>}
      >
        <div className={styles.options}>
          {game.players.map((candidate) => {
            const isSelf = candidate.id === player.id;
            return (
              <label
                className={`${styles.option} ${
                  game.pendingVote === candidate.id ? styles.selected : ""
                } ${isSelf ? styles.disabled : ""}`}
                key={candidate.id}
              >
                <input
                  checked={game.pendingVote === candidate.id}
                  className={styles.hiddenRadio}
                  disabled={isSelf}
                  name="vote"
                  onChange={(event) =>
                    game.setPendingVote(event.currentTarget.value)
                  }
                  type="radio"
                  value={candidate.id}
                />
                <span className={styles.optionName}>{candidate.name}</span>
              </label>
            );
          })}
        </div>
      </GameStep>
      <Progress
        completed={game.voteIndex}
        phase="voting"
        total={game.players.length}
      />
    </>
  );
}
