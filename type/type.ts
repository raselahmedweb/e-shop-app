import { Colors } from "@/constants/Colors";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ThemeProviderProps {
  children: ReactNode
}

export interface ThemeContextType {
  colorScheme: "light" | "dark";
  setColorScheme: Dispatch<SetStateAction<"light" | "dark">>;
  theme: typeof Colors.light | typeof Colors.dark;
}

export interface AuthProviderProps {
  children: ReactNode
}