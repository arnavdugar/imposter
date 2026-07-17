import { Button } from "../../common/components/Button";
import { GameStep } from "../../common/components/GameStep";
import { useGame } from "../hooks/useGame";
import { roleById } from "../roles";
import type { RoleId } from "../types";
import { RoleBadge } from "./RoleBadge";

import * as styles from "./NightPage.css";

function Choice({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <label className={`${styles.choice} ${checked ? styles.selected : ""}`}>
      <input
        checked={checked}
        className={styles.hiddenInput}
        onChange={onChange}
        type="checkbox"
      />
      <span className={styles.choiceIcon}>
        <span
          aria-hidden="true"
          className={`material-symbols-outlined ${styles.choiceIconGlyph}`}
        >
          {checked ? "check_circle" : "radio_button_unchecked"}
        </span>
      </span>
      <span>{label}</span>
    </label>
  );
}

export function NightPage() {
  const game = useGame();

  if (game.nightStep === "intro") {
    return (
      <GameStep
        actions={
          <Button onClick={game.beginNight} type="button">
            Continue
          </Button>
        }
        beforeTitle={
          <span aria-hidden="true" className={styles.moonIcon}>
            <span
              className={`material-symbols-outlined ${styles.moonIconGlyph}`}
            >
              bedtime
            </span>
          </span>
        }
        description={
          <>
            Put this phone face up in the center. Start the narrator and have
            everyone close their eyes. When the narrator calls your starting
            role, open your eyes, pick up this device, and complete the private
            action shown here.
          </>
        }
        title="Night phase"
      />
    );
  }

  if (game.nightStep === "calling" || game.nightStep === "complete") {
    return (
      <GameStep
        actions={
          <Button onClick={game.claimNightTurn} type="button">
            Continue
          </Button>
        }
        description={
          <>
            When the narrator calls your starting role or once everyone has
            completed the night phase, continue. When you have completed your
            night phase actions, return the device to the center and close your
            eyes.
          </>
        }
        title="Waiting for the next role"
      />
    );
  }

  const stage = game.currentNightStage;
  if (!stage) return null;
  const stageRole: RoleId =
    stage === "doppelganger-insomniac" ? "insomniac" : stage;
  const stageName =
    stage === "doppelganger-insomniac"
      ? "Doppelgänger–Insomniac"
      : roleById[stageRole].name;

  if (game.nightStep === "result") {
    return (
      <GameStep
        actions={
          <Button onClick={game.hideAndContinueNight} type="button">
            Hide and return phone
          </Button>
        }
        beforeTitle={<span className={styles.eyebrow}>Private result</span>}
        description={game.nightMessage}
        title="Memorize this"
      >
        {game.nightReveals.length > 0 ? (
          <div className={styles.revealList}>
            {game.nightReveals.map((reveal) => (
              <article className={styles.revealCard} key={reveal.label}>
                <span className={styles.revealLabel}>{reveal.label}</span>
                <RoleBadge role={reveal.role} />
              </article>
            ))}
          </div>
        ) : null}
      </GameStep>
    );
  }

  const role = game.nightActionRole;
  if (!role) return null;
  const actor = game.players.find(
    (player) => player.id === game.nightActionActorId,
  );
  const otherPlayers = game.players.filter(
    (player) => player.id !== game.nightActionActorId,
  );
  const isDoppelgangerAction =
    stage === "doppelganger" && role !== "doppelganger";
  const isLoneWerewolf = role === "werewolf" && game.wolfActorIds.length === 1;
  const showPlayerChoices =
    role === "doppelganger" ||
    role === "robber" ||
    role === "troublemaker" ||
    (role === "seer" && game.seerRevealTarget === "player");
  const showCenterChoices =
    role === "drunk" ||
    isLoneWerewolf ||
    (role === "seer" && game.seerRevealTarget === "center");
  const selectionMaximum = game.requiredNightSelections;

  const actionTitle = (() => {
    switch (role) {
      case "doppelganger":
        return "Choose a role to copy";
      case "werewolf":
        return isLoneWerewolf
          ? "Inspect one center role"
          : "Meet the werewolves";
      case "minion":
        return "Find the werewolves";
      case "mason":
        return "Find the other Mason";
      case "seer":
        return "Use your vision";
      case "robber":
        return "Choose a player to rob";
      case "troublemaker":
        return "Choose two players to swap";
      case "drunk":
        return "Choose an unseen center role";
      default:
        return "Check your current role";
    }
  })();

  const actionButton = (() => {
    switch (role) {
      case "doppelganger":
        return "Copy this role";
      case "seer":
        return "Reveal selected role(s)";
      case "robber":
        return "Swap and view new role";
      case "troublemaker":
        return "Swap selected roles";
      case "drunk":
        return "Exchange roles unseen";
      default:
        return "Show private information";
    }
  })();

  const actionInstruction = (() => {
    if (isDoppelgangerAction && game.nightMessage) return game.nightMessage;
    if (isLoneWerewolf) {
      return "You are the only werewolf. You may inspect one center role.";
    }
    return roleById[role].nightInstruction;
  })();

  return (
    <GameStep
      actions={
        <>
          <Button
            disabled={!game.canSubmitNightAction}
            onClick={game.performNightAction}
            type="button"
          >
            {actionButton}
          </Button>
          {game.canSkipNightAction ? (
            <Button
              onClick={game.skipNightAction}
              type="button"
              variant="secondary"
            >
              Do nothing
            </Button>
          ) : null}
        </>
      }
      beforeTitle={
        <div className={styles.actionHeader}>
          <span className={styles.eyebrow}>
            {isDoppelgangerAction ? "Copied role action" : "Night action"}
          </span>
          <RoleBadge role={role} />
        </div>
      }
      description={actionInstruction}
      title={actionTitle}
    >
      {role === "seer" ? (
        <div className={styles.modeSwitch} role="radiogroup">
          <label
            className={`${styles.modeOption} ${game.seerRevealTarget === "player" ? styles.selected : ""}`}
          >
            <input
              checked={game.seerRevealTarget === "player"}
              className={styles.hiddenInput}
              name="seer-mode"
              onChange={() => game.setSeerRevealTarget("player")}
              type="radio"
            />
            One player
          </label>
          <label
            className={`${styles.modeOption} ${game.seerRevealTarget === "center" ? styles.selected : ""}`}
          >
            <input
              checked={game.seerRevealTarget === "center"}
              className={styles.hiddenInput}
              name="seer-mode"
              onChange={() => game.setSeerRevealTarget("center")}
              type="radio"
            />
            Two center roles
          </label>
        </div>
      ) : null}

      {showPlayerChoices ? (
        <div className={styles.choiceList}>
          {otherPlayers.map((player) => (
            <Choice
              checked={game.nightSelections.includes(player.id)}
              key={player.id}
              label={player.name}
              onChange={() =>
                game.toggleNightSelection(player.id, selectionMaximum)
              }
            />
          ))}
        </div>
      ) : null}

      {showCenterChoices ? (
        <div className={styles.centerGrid}>
          {game.centerCards.map((center) => (
            <Choice
              checked={game.nightSelections.includes(center.id)}
              key={center.id}
              label={center.label}
              onChange={() =>
                game.toggleNightSelection(center.id, selectionMaximum)
              }
            />
          ))}
        </div>
      ) : null}

      {actor ? (
        <small className={styles.privateNote}>
          Only the player who began as {stageName} should use this screen.
        </small>
      ) : null}
    </GameStep>
  );
}
