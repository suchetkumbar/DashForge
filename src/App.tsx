import { WelcomePage,Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {useNotificationProvider} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import {dataProvider, liveProvider, authProvider} from "./providers";
import { Home, Login, Register, ForgotPassword} from "./pages";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";

import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerProvider}
                authProvider={authProvider}
                
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "bY76l2-Al6khk-N3VqZo",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route index element = {<WelcomePage />} />
                  <Route index element = {<Home />} />
                  <Route path="/register" element = {<Register />} />
                  <Route path="/login" element = {<Login />} />
                  <Route path="/forgot-password" element = {<ForgotPassword />} />
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
