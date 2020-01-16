import { ApolloClient } from "@wora/apollo-offline";
import { HttpLink } from "apollo-link-http";
import ApolloCache from '@wora/apollo-cache';
 
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});
 
const client = new ApolloClient({
  link: httpLink,
  cache: new ApolloCache({
    dataIdFromObject: o => o.id
  })
});

export default client