export const msalConfig = {
  auth: {
    clientId: "2591dbd0-4a5e-4660-b4d8-f64713048d51",
    authority: "https://login.microsoftonline.com/5dacbed6-6117-407f-a9c2-e8be4cb922b3", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:3000",
    //redirectUri: "https://plugin.bimroom.com",
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};


