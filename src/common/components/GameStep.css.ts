import { style } from "@vanilla-extract/css";
import { vars } from "../../styles.css";

export const step = style({
  display: "flex",
  flexDirection: "column",
  gap: 18,
  padding: 18,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 8,
  background: vars.color.surface,
  boxShadow: vars.shadow.panel,
});

export const title = style({
  margin: 0,
  color: vars.color.text,
  fontSize: vars.font.size.display,
  lineHeight: 1.04,
});

export const description = style({
  margin: 0,
  color: vars.color.muted,
  lineHeight: 1.6,
});

export const actions = style({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});
