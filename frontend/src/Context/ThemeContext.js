// Imports
import { createContext } from "react";

// Code
const ThemeContext = createContext({
  theme: "",
  setTheme: () => {console.log("setTheme")}
});

export default ThemeContext;