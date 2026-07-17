import { style } from "@vanilla-extract/css";
import { vars } from "../../styles.css";

export const section = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minWidth: 0,
  gap: 12,
});

export const sectionHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  color: vars.color.muted,
  fontSize: vars.font.size.secondary,
  fontWeight: 700,
});

export const sectionTitle = style({
  margin: 0,
  color: vars.color.text,
  fontSize: vars.font.size.secondary,
  fontWeight: 800,
});

export const playerList = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const playerRow = style({
  display: "grid",
  gridTemplateColumns: "28px minmax(0, 1fr) auto",
  gap: 8,
  alignItems: "center",
});

export const playerNumber = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 42,
  borderRadius: 8,
  background: vars.color.brandSoft,
  color: vars.color.brandHover,
  fontWeight: 800,
});

export const removeButton = style({
  width: 42,
  minWidth: 42,
  minHeight: 42,
  padding: 0,
  color: vars.color.muted,
  justifySelf: "end",
});
