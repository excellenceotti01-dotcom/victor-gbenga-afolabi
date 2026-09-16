import type { CSSProperties, ReactNode } from "react";

import type { BusinessTheme } from "./types";

type BusinessThemeScopeProps = {
  theme: BusinessTheme;
  children: ReactNode;
};

type BusinessThemeStyle = CSSProperties & {
  "--business-background": string;
  "--business-surface": string;
  "--business-text": string;
  "--business-muted-text": string;
  "--business-brand": string;
  "--business-brand-hover": string;
  "--business-accent": string;
  "--business-atmosphere": string;
  "--business-inactive-dot": string;
};

export default function BusinessThemeScope({
  theme,
  children,
}: BusinessThemeScopeProps) {
  const style: BusinessThemeStyle = {
    "--business-background": theme.background,
    "--business-surface": theme.surface,
    "--business-text": theme.text,
    "--business-muted-text": theme.mutedText,
    "--business-brand": theme.brand,
    "--business-brand-hover": theme.brandHover,
    "--business-accent": theme.accent,
    "--business-atmosphere": theme.atmosphere,
    "--business-inactive-dot": theme.inactiveDot,
  };

  return <div style={style}>{children}</div>;
}
