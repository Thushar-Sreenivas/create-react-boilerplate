import { lazy } from "react";

const HomePage = lazy(() =>
  import("../components/pages/HomePage" /* webpackChunkName: "HomePage" */)
);

const AboutPage = lazy(() =>
  import("../components/pages/AboutPage" /* webpackChunkName: "AboutPage" */)
);

export const pages = {
  home: {
    title: "Home",
    path: "/",
    Component: HomePage
  },
  about: {
    title: "About",
    path: "/about",
    Component: AboutPage
  }
};
