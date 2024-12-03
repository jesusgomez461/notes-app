import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./queryClient.ts";
import { I18nextProvider } from "react-i18next";
import i18n from "./global/locales/i18n.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <I18nextProvider i18n={i18n}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </I18nextProvider>
  // </StrictMode>
);
