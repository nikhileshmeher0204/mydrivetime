import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("token")) {
          return <Redirect to="/login" />;
        }
        
        if (rest.role && (!user || user.role !== rest.role)) {
          return <Redirect to="/" />;
        }

        return <Component {...props} />;
      }}
    />
  );
}

export default ProtectedRoute;