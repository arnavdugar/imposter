import { Button } from "../../common/components/Button";
import { GameStep } from "../../common/components/GameStep";
import { VoteBar } from "../../common/components/VoteBar";
import { useGame } from "../hooks/useGame";
import { effectiveRole, roleById, teamForRole } from "../roles";
import type { Team } from "../types";
import { RoleBadge } from "./RoleBadge";

import * as styles from "./RevealPage.css";

const teamLabels: Record<Team, string> = {
  village: "Village",
  werewolf: "Werewolf team",
  tanner: "Tanner",
};

export function RevealPage() {
  const game = useGame();
  const result = game.result;
  if (!result) return null;

  const winners = result.winningTeams.map((team) => teamLabels[team]);
  const title =
    winners.length === 0
      ? "No team wins"
      : winners.length === 1
        ? `${winners[0]} wins`
        : `${winners.join(" and ")} win`;
  const eliminatedPlayers = game.players.filter((player) =>
    result.eliminatedIds.includes(player.id),
  );

  return (
    <GameStep
      actions={
        <Button onClick={game.startGame} type="button">
          New game
        </Button>
      }
      beforeTitle={<span className={styles.eyebrow}>Final result</span>}
      description={
        eliminatedPlayers.length === 0
          ? "Every player received fewer than two votes, so no one was eliminated."
          : `${eliminatedPlayers.map((player) => player.name).join(" and ")} ${
              eliminatedPlayers.length === 1 ? "was" : "were"
            } eliminated.`
      }
      title={title}
    >
      <div className={styles.winnerRow}>
        {result.winningTeams.length > 0 ? (
          result.winningTeams.map((team) => (
            <span className={styles.winnerChip} key={team}>
              <span
                aria-hidden="true"
                className={`material-symbols-outlined ${styles.trophyIcon}`}
              >
                trophy
              </span>
              {teamLabels[team]}
            </span>
          ))
        ) : (
          <span className={styles.noWinnerChip}>No winning team</span>
        )}
      </div>

      <section className={styles.resultSection} aria-labelledby="players-title">
        <h3 className={styles.sectionTitle} id="players-title">
          Final player roles and votes
        </h3>
        <div className={styles.cardList}>
          {game.players.map((player) => {
            if (!player.card || !player.initialRole) return null;
            const voteCount = result.voteCounts.find(
              (entry) => entry.playerId === player.id,
            );
            if (!voteCount) return null;
            const finalRole = effectiveRole(player.card);
            const changed = player.initialRole !== finalRole;
            const eliminated = result.eliminatedIds.includes(player.id);
            const won = result.winningTeams.includes(teamForRole(finalRole));
            return (
              <article
                className={`${styles.playerCard} ${
                  eliminated ? styles.eliminatedCard : ""
                }`}
                key={player.id}
              >
                <div className={styles.playerHeader}>
                  <div>
                    <strong>{player.name}</strong>
                    <small className={styles.playerStatus}>
                      {eliminated ? "Eliminated" : "Survived"}
                      {won ? " · Winner" : ""}
                    </small>
                  </div>
                  <RoleBadge role={finalRole} />
                </div>
                {changed ? (
                  <p className={styles.roleChange}>
                    Began as {roleById[player.initialRole].name} → ended as{" "}
                    {roleById[finalRole].name}
                  </p>
                ) : (
                  <p className={styles.roleChange}>
                    Role did not change overnight
                  </p>
                )}
                <div className={styles.voteDetails}>
                  <div className={styles.voteHeader}>
                    <strong>Votes received</strong>
                    <span className={styles.voteCount}>
                      {voteCount.count} / {game.players.length}
                    </span>
                  </div>
                  <VoteBar
                    label={`${player.name} received ${voteCount.count} of ${game.players.length} votes`}
                    tone={eliminated ? "danger" : "brand"}
                    total={game.players.length}
                    value={voteCount.count}
                  />
                  <small className={styles.voterNames}>
                    {voteCount.voters.length > 0
                      ? `Voted by ${voteCount.voters.join(", ")}`
                      : "No votes"}
                  </small>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.resultSection} aria-labelledby="center-title">
        <h3 className={styles.sectionTitle} id="center-title">
          Final center roles
        </h3>
        <div className={styles.centerGrid}>
          {game.centerCards.map((center) => (
            <article className={styles.centerCard} key={center.id}>
              <small className={styles.centerLabel}>{center.label}</small>
              <RoleBadge role={effectiveRole(center.card)} />
            </article>
          ))}
        </div>
      </section>
    </GameStep>
  );
}
