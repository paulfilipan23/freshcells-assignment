// src/apollo/client.ts
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { HttpLink } from "@apollo/client/link/http";
import { getToken } from "../auth/storage";

const httpLink = new HttpLink({
  uri:
    import.meta.env.VITE_GRAPHQL_URL ||
    "https://cms.trial-task.k8s.ext.fcse.io/graphql",
});

const authLink = new SetContextLink((prev) => {
  const token = getToken();
  return {
    headers: {
      ...prev.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
