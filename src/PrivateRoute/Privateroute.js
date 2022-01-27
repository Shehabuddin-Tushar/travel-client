import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoute({ children, ...rest }) {
    let {user,isloading} = useAuth();
    if(isloading){
      return "...loading";
    }
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;