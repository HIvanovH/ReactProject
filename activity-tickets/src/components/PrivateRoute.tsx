import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  adminOnly?: boolean;
}

const PrivateRoute = ({ children, adminOnly }: Props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const path = useLocation();

  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  useEffect(() => {
    const isAuth = () => {
      return !!token;
    };

    const authed = isAuth();
    setAuthenticated(authed);
    setIsLoaded(true);
  }, [token, setAuthenticated]);

  const canAccessRoute = () => {
    if (adminOnly) {
      if (token) {
        const tokenData: any = jwt_decode(token.result);
        const userRole =
          tokenData[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];

        return authenticated && userRole === "Admin";
      } else {
        return false;
      }
    }

    return authenticated;
  };

  return (
    <>
      {isLoaded ? (
        canAccessRoute() ? (
          children
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default PrivateRoute;
