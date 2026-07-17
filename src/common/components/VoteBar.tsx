import * as styles from "./VoteBar.css";

interface VoteBarProps {
  label: string;
  total: number;
  tone?: "brand" | "danger";
  value: number;
}

export function VoteBar({
  label,
  total,
  tone = "brand",
  value,
}: VoteBarProps) {
  const maximum = Math.max(0, total);
  const current = Math.min(Math.max(0, value), maximum);
  const percentage = maximum === 0 ? 0 : (current / maximum) * 100;

  return (
    <div
      aria-label={label}
      aria-valuemax={maximum}
      aria-valuemin={0}
      aria-valuenow={current}
      className={styles.track}
      role="progressbar"
    >
      <div
        className={styles.fill[tone]}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
