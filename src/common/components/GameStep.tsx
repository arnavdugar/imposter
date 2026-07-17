import type { ComponentChildren } from "preact";
import { useId } from "preact/hooks";

import * as styles from "./GameStep.css";

interface GameStepProps {
  actions?: ComponentChildren;
  beforeTitle?: ComponentChildren;
  children?: ComponentChildren;
  description?: ComponentChildren;
  title: ComponentChildren;
}

export function GameStep({
  actions,
  beforeTitle,
  children,
  description,
  title,
}: GameStepProps) {
  const titleId = useId();

  return (
    <section aria-labelledby={titleId} className={styles.step}>
      {beforeTitle}
      <h2 className={styles.title} id={titleId}>
        {title}
      </h2>
      {description != null ? (
        <p className={styles.description}>{description}</p>
      ) : null}
      {children}
      {actions != null ? <div className={styles.actions}>{actions}</div> : null}
    </section>
  );
}
