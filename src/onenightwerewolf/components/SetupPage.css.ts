import { style } from "@vanilla-extract/css";
import { vars } from "../../styles.css";

export const setupPanel = style({
  display: "flex",
  flexDirection: "column",
  gap: 22,
  paddingBlock: 4,
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

export const warningMessage = style({
  margin: 0,
  padding: "12px 14px",
  borderRadius: 8,
  background: vars.color.warningSoft,
  color: vars.color.warning,
  fontWeight: 800,
});

export const errorMessage = style({
  margin: 0,
  padding: "12px 14px",
  borderRadius: 8,
  background: vars.color.dangerSoft,
  color: vars.color.danger,
  fontWeight: 800,
});

export const section = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minWidth: 0,
  gap: 12,
});

export const roleCount = style({
  display: "block",
  marginTop: 3,
  fontSize: vars.font.size.caption,
});

export const recommendButton = style({
  width: "auto",
  minHeight: 38,
  padding: "0 12px",
  fontSize: vars.font.size.caption,
});

export const roleList = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

export const roleCard = style({
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) auto",
  alignItems: "center",
  gap: 12,
  padding: 12,
  border: `1px solid ${vars.color.border}`,
  borderRadius: 8,
  background: vars.color.surfaceAlt,
});

export const selectedRoleCard = style({
  borderColor: vars.color.brand,
  background: vars.color.brandSoft,
  color: vars.color.brandHover,
});

export const roleDetails = style({ minWidth: 0 });

export const roleSummary = style({
  margin: "7px 0 0",
  color: vars.color.muted,
  fontSize: vars.font.size.caption,
  lineHeight: 1.4,
});

export const stepper = style({
  display: "grid",
  gridTemplateColumns: "36px 28px 36px",
  alignItems: "center",
  gap: 5,
});

export const stepperButton = style({
  width: 36,
  minHeight: 36,
  padding: 0,
});

export const stepperValue = style({
  color: vars.color.text,
  fontWeight: 900,
  textAlign: "center",
});
