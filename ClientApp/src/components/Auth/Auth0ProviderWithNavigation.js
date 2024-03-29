import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import AccountApis from "../../api/AccountApis";

const Auth0ProviderWithNavigation = ({ children }) => {
  const domain = "linh-nguyen.au.auth0.com";
  const clientId = "0a7jLwUh1nOgOQk9ogJHodR9AQBPZ9n3";
  const audience = "smart-spender";

  const navigate = useNavigate();
  const onRedirectCallback = (appState, user) => {
    AccountApis.postAccount(JSON.stringify({
      given_name: user.given_name,
      family_name: user.family_name,
      email: user.email,
    }));
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: window.location.origin,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigation;