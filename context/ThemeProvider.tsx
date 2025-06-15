import { Colors } from "@/constants/Colors";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [colorScheme, setColorScheme] = useState('light');
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    const values ={
        colorScheme,setColorScheme,theme
    }
    return <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
}