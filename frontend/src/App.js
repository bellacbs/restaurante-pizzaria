import React from "react";
import { ThemeProvider } from "styled-components";
import theme from "./constants/theme";
import GlobalState from "./global/GlobalState";
import Router from "./routes/Router";

const App = () => {
  return (
    <GlobalState>
      <ThemeProvider theme={theme}>
        <Router/>
      </ThemeProvider>
    </GlobalState>
  );
}

export default App;
