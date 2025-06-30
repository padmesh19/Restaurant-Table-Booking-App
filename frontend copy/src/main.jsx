import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "./elements";
import store from "./redux/store";
import { BrowserRouter, RouterProvider } from "react-router";
import router from "./routes.jsx";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
);
