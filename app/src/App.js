import React from "react";
import { Route, Switch } from "react-router-dom";
import Routes from "./routes.js";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import PublicLayout from "./Layouts/PublicLayout";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout {...props} {...rest}>
        <Component {...props} />
      </Layout>
    )}
  />
);

const useStyles = makeStyles({});

export default function App(props) {
  const classes = useStyles();
  const theme = useTheme();

  const routerComponents = [];
  let routes = Routes;

  routes.map((route) => {
    if (route.path !== "/404") {
      if (route.path === "/") {
        routerComponents.push(
          <AppRoute
            layout={PublicLayout}
            label={route.label}
            key={route.label}
            exact
            path={`${route.path}`}
            component={route.component}
            description={route.description}
            keywords={route.keywords}
          />
        );
      } else {
        routerComponents.push(
          <AppRoute
            layout={PublicLayout}
            label={route.label}
            key={route.label}
            path={`${route.path}`}
            component={route.component}
            description={route.description}
            keywords={route.keywords}
          />
        );
      }

      if (route.subMenus) {
        route.subMenus.map((subRoute) => {
          routerComponents.push(
            <AppRoute
              layout={PublicLayout}
              label={subRoute.label}
              key={subRoute.label}
              path={`${subRoute.path}`}
              component={subRoute.component}
              description={subRoute.description}
              keywords={subRoute.keywords}
            />
          );
        });
      }
    } else {
      routerComponents.push(
        <AppRoute
          layout={PublicLayout}
          label={route.label}
          key={route.label}
          path="*"
          component={route.component}
          description={route.description}
          keywords={route.keywords}
        />
      );
    }
  });

  return <Switch>{routerComponents}</Switch>;
}
