## Create a React Boilerplate

There is a story of a hungry man who went begging for food. One provided him fish and other taught him to fish. Sometimes it is better to provide means to earn food rather than giving food. Okay, it depends of how hungry they are and how difficult is the way to earn food. Here I am providing you both, boilerplate and way to create boilerplate.

So why a way to create boilerplate. With ready made boilerplate you may face the following: 
- Not all the boilerplate features are required
- Some packages are outdated
- You don't what is happening

So that is the reason why this article provides the steps to create a boilerplate, rather than a boilerplate.

The boilerplate main to have the following
1. Styling
2. Routing
3. Lazy Loading of pages
4. Document Head Management
5. Error Boundary
6. TypeScript (optional)
7. State Management (not really)

###  Lets us start with the `create-react-app`

Here you have a choice to go with or without `TypeScript`.

Without TypeScript
```bash
npx create-react-app your-application-name 
``` 

With TypeScript
```
npx create-react-app your-application-name --template typescript
```


### Routing
In case you have a more than one page, you need to have a router. For routing we are using [React Router](https://github.com/ReactTraining/react-router)

First install `react-router`
```
 yarn add  react-router-dom
```

And if you are using `TypeScript` add types
```
yarn add @types/react-router
```

It is good to have a `config/pages.ts` file where you define all the pages related information. 
And you can define all your pages in a `components/pages` folder.

```javascript
import { HomePage, AboutPage } from "../components/pages";

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
```

This is in the form of a directory so that we can refer `pages.about.path`. To get as an array use `Object.values(pages)`

We will also have simple navigation `components/layouts/NavBar.tsx`

```javascript
import React from "react";
import { Link } from "react-router-dom";
import { pages } from "../../config/pages";

export default function TopNav() {
  return (
    <ul>
      <li>
        <Link to={pages.home.path}>Home</Link>
      </li>
      <li>
        <Link to={pages.about.path}>About</Link>
      </li>
    </ul>
  );
}
```

And in the `App.tsx` will mix the above

```javascript
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { pages } from "./config/pages";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {Object.values(pages).map((page, index) => (
            <Route
              key={index}
              exact
              path={page.path}
              render={() => 
                <>
                  <TopNav />
                  <page.Component />
                </>
              }
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;

```

Once done you will have `/` pointing to the `Home Page` and `/about` pointing to the `About Page`.

### Manage Document Head 

We will use [`react-helment-async`](https://www.npmjs.com/package/react-helmet-async) to manage document head.
`react-helment` is used manage all of your changes to the document head like `title`, `metadata`, etc. But then why `react-helment-async` intead of `react-helmet`.
> react-helmet relies on react-side-effect, which is not thread-safe. If you are doing anything asynchronous on the server, you need Helmet to encapsulate data on a per-request basis, this package does just that.

Install 
```bash
yarn add react-helmet-async
```


Now to change `title` in relation with the page loaded, the `App.tsx` will be 
```javascript
import { Helmet, HelmetProvider } from "react-helmet-async";
// ....
// ....
function App() {
  return (
    <HelmetProvider>
      <Router>
// ....
// ....
                <>
                  <Helmet>
                    <title>{page.title}</title>
                  </Helmet>
                  <TopNav />
                  <page.Component />
                </>
// ....
// ....
      </Router>
    </HelmetProvider>
  );
}
```


### Styling
For styling you have choices. 
  - You can go with pre-processors like `sass` or `less`
  - Use UI libraries like [Bootstrap](https://getbootstrap.com/), [Ant Design](https://ant.design/docs/react/introduce)
  - A minimal utility library like [Tailwind](https://www.tailwindtoolbox.com/)
  - Or you can use [styled-components](https://styled-components.com/)

Here we will be using `styled-components`. The choice depends on your requirement and the team. If you want a custom theme you should go with something like `sass` or `styled-components`. But when you are running short of time and the design is a cliche one go with `bootstrap` or `ant design`.

Install
```bash
yarn add styled-components
```

And if you are using `TypeScript` add types
```bash
yarn add @types/styled-components
```

Let's make the NavBar look better
```javascript
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { pages } from "../../config/pages";

const NavCtnr = styled.aside`
  width: 100%;
  background: #555;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const NavItem = styled.li`
  a {
    text-decoration: none;
    padding: 1rem;
    display: inline-block;
    color: #eee;
  }
`;

export default function TopNav() {
  return (
    <NavCtnr>
      <NavList>
        <NavItem>
          <Link to={pages.home.path}>Home</Link>
        </NavItem>
        <NavItem>
          <Link to={pages.about.path}>About</Link>
        </NavItem>
      </NavList>
    </NavCtnr>
  );
}
```

You should use [ThemeProvider](https://styled-components.com/docs/advanced#theming) from `styled-component` rather than using hard coded values. Check the boilerplate.


### Lazy Load JS
Consider you have 10 pages in your application. Normally when a single page loads, it loads all the all the JS required for all the pages, not just the current page.  This is normal loading or you can call eager loading. Via lazy loading we will load only the JS required for the current page. Load the rest of the resources when requested for. It is on-demand loading(lazy) of the resources rather than eager loading all of them. This helps to improve the initial loading time.

To enable lazy loading we are making a few changes to the `config/pages.ts` lazy load the pages. Instead of loading pages directly we need to lazy load it.
```javascript
import { lazy } from "react";

const HomePage = lazy(() =>
  import("../components/pages/HomePage" /* webpackChunkName: "HomePage" */)
);

const AboutPage = lazy(() =>
  import("../components/pages/AboutPage" /* webpackChunkName: "AboutPage" */)
);

// ....
// ....
```

Now we will define a simple loading indicator in `pages/generics/LoadingIndicator.tsx`. You can make it fancier as you wish
```javascript
import React from "react";

export default function LoadingIndicator() {
  return <div>Loading...  </div>;
}
```

And in the `App.tsx` we will wrap the page component with `Suspense`
```javascript
import React, { Suspense } from "react";
import { LoadingIndicator } from "./components/generics";

// .....
// .....
                  <Suspense fallback={<LoadingIndicator />}>
                    <page.Component />
                  </Suspense>
// .....
// .....
```

### Setting Error Boundary
Since we are lazy loading the component, what if the component fails to load. Rather than making the whole screen go blank, we can provide better user experience by using [Error Boundaries](https://reactjs.org/docs/error-boundaries.html). Error boundary will help to replace component having exception with a fallback component. 

We will be using [react-error-boundary](https://github.com/bvaughn/react-error-boundary).

Install
```bash
yarn add react-error-boundary
```

And in the `App.tsx` page add the following
```javascript
//....
//....
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoadingIndicator, ErrorFallback } from "./components/generics";
//....
//....
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                      <Suspense fallback={<LoadingIndicator />}>
                        <page.Component />
                      </Suspense>
                    </ErrorBoundary>
//....
//....
```

**References**
  - [Egghead.io Video](https://egghead.io/lessons/react-using-react-error-boundaries-to-handle-errors-in-react-components)
  - [Official React Documentation](https://reactjs.org/docs/error-boundaries.html)

### Storybook
Why? Improves the development experience.
<Under Progress>
Install
```
```

### State Management
This is not a mandatory component. When the components have lot of shared state you will have to go for a [state management](https://kentcdodds.com/blog/application-state-management-with-react) to avoid [props drilling](https://kentcdodds.com/blog/prop-drilling/).
Do read the article mentioned here. It will give you a direction on State Management. It mentions about state management methods like
  1. [`useState`]()
  2. [`useReducer`]()
  3. [`useContext`]()
  4. [Redux]()

Other than the onces mentioned above there is new child in state management ~ [Recoil](https://github.com/facebookexperimental/Recoil) by Facebook. You can also checkout the [egghead.io video tutorial on Recoil](https://egghead.io/playlists/getting-started-with-recoil-in-react-1fca)