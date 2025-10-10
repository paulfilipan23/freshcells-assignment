import type { MantineColorsTuple } from "@mantine/core";
import { createTheme } from "@mantine/core";

// Custom brand color palette
const brandColor: MantineColorsTuple = [
  "#e3f2fd",
  "#bbdefb",
  "#90caf9",
  "#64b5f6",
  "#42a5f5",
  "#2196f3",
  "#1e88e5",
  "#1976d2",
  "#1565c0",
  "#0d47a1",
];

// Application theme configuration
export const theme = createTheme({
  colors: {
    brand: brandColor,
  },
  primaryColor: "brand",
  defaultRadius: "md",
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  headings: {
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
    fontWeight: "700",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
});
