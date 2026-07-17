import { Button } from "../../common/components/Button";
import { GameStep } from "../../common/components/GameStep";
import { Progress } from "../../common/components/Progress";
import { useGame } from "../hooks/useGame";
import { roleById } from "../roles";

import * as styles from "./RolePage.css";

export function RolePage() {
  const game = useGame();
  const player = game.currentRolePlayer;
  const role = player?.initialRole ? roleById[player.initialRole] : null;
  if (!player || !role) return null;

  const roleArticle = /^[aeiou]/i.test(role.name) ? "an" : "a";

  const teamDescription =
    role.id === "doppelganger" ? (
      <>
        Your team becomes the <strong>team of the role you copy</strong>.
      </>
    ) : role.team === "werewolf" ? (
      <>
        You are on the <strong>werewolf team</strong>.
      </>
    ) : role.team === "tanner" ? (
      <>
        You are on <strong>your own team</strong> and win only if you are
        eliminated.
      </>
    ) : (
      <>
        You are on the <strong>village team</strong>.
      </>
    );

  return (
    <>
      {game.roleVisible ? (
        <GameStep
          actions={
            <Button onClick={game.hideRoleAndPass} type="button">
              Hide and pass
            </Button>
          }
          description={
            <>
              You are {roleArticle} <strong>{role.name}</strong>.{" "}
              {teamDescription} {role.summary}
            </>
          }
          title={player.name}
        >
          <div className={styles.instructionCard}>
            <span className={styles.instructionLabel}>At night</span>
            <p className={styles.instructionText}>{role.nightInstruction}</p>
          </div>
        </GameStep>
      ) : (
        <GameStep
          actions={
            <Button onClick={game.revealRole} type="button">
              Reveal role
            </Button>
          }
          description={
            <>
              Only {player.name} should look at this device. Memorize the role,
              then hide it before passing on.
            </>
          }
          title={<>Pass to {player.name}</>}
        />
      )}
      <Progress
        completed={game.roleIndex}
        phase="hidden roles"
        total={game.players.length}
      />
    </>
  );
}
