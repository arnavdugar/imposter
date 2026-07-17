import { Button } from "../../common/components/Button";
import { GameStep } from "../../common/components/GameStep";
import { PlayerSetupSection } from "../../common/components/PlayerSetupSection";
import { useGame } from "../hooks/useGame";
import { roleDefinitions } from "../roles";
import { RoleBadge } from "./RoleBadge";

import * as styles from "./SetupPage.css";

export function SetupPage() {
  const game = useGame();

  return (
    <GameStep
      actions={
        <Button
          disabled={Boolean(game.setupProblem)}
          onClick={game.startGame}
          type="button"
        >
          Start
        </Button>
      }
      title="Game setup"
    >
      <div className={styles.setupPanel}>
        <p className={styles.warningMessage}>
          Use a narration app on a different device for the night phase and day
          timer.
        </p>

        <PlayerSetupSection
          maximumPlayers={10}
          minimumPlayers={3}
          onAddPlayer={game.addPlayer}
          onRemovePlayer={game.removePlayer}
          onUpdatePlayerName={game.updatePlayerName}
          players={game.players}
        />

        <div className={styles.section}>
          <header className={styles.sectionHeader}>
            <div>
              <h3 className={styles.sectionTitle}>Characters</h3>
              <span className={styles.roleCount}>
                {game.selectedRoles.length} selected · {game.requiredRoleCount}{" "}
                needed
              </span>
            </div>
            <Button
              className={styles.recommendButton}
              onClick={game.useRecommendedRoles}
              type="button"
              variant="secondary"
            >
              Use recommended set
            </Button>
          </header>
          <div className={styles.roleList}>
            {roleDefinitions.map((role) => {
              const count = game.roleCounts[role.id] ?? 0;
              return (
                <article
                  className={`${styles.roleCard} ${count > 0 ? styles.selectedRoleCard : ""}`}
                  key={role.id}
                >
                  <div className={styles.roleDetails}>
                    <RoleBadge role={role.id} />
                    <p className={styles.roleSummary}>{role.summary}</p>
                  </div>
                  <div
                    aria-label={`${role.name} role count`}
                    className={styles.stepper}
                    role="group"
                  >
                    <Button
                      aria-label={`Remove ${role.name}`}
                      className={styles.stepperButton}
                      disabled={count === 0}
                      onClick={() => game.removeRole(role.id)}
                      type="button"
                      variant="secondary"
                    >
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined"
                      >
                        remove
                      </span>
                    </Button>
                    <output className={styles.stepperValue}>{count}</output>
                    <Button
                      aria-label={`Add ${role.name}`}
                      className={styles.stepperButton}
                      disabled={count + role.increment > role.max}
                      onClick={() => game.addRole(role.id)}
                      type="button"
                      variant="secondary"
                    >
                      <span
                        aria-hidden="true"
                        className="material-symbols-outlined"
                      >
                        add
                      </span>
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {game.setupProblem ? (
          <p className={styles.errorMessage}>{game.setupProblem}</p>
        ) : null}
      </div>
    </GameStep>
  );
}
