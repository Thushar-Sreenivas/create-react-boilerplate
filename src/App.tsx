import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { ErrorBoundary } from "react-error-boundary";
import { pages } from "./config/pages";
import theme from "./config/theme";
import { TopNav } from "./components/layout";
import { LoadingIndicator, ErrorFallback } from "./components/generics";
import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Switch>
            {Object.values(pages).map((page, index) => (
              <Route
                key={index}
                exact
                path={page.path}
                render={r => (
                  <>
                    <Helmet>
                      <title>{page.title}</title>
                    </Helmet>
                    <TopNav />
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <Suspense fallback={<LoadingIndicator />}>
                        <page.Component />
                      </Suspense>
                    </ErrorBoundary>
                  </>
                )}
              />
            ))}
          </Switch>
        </ThemeProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
