/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "../helpers/apollo";

export const requestService = {
  getAll: (query: any) => {
    return client.query({
      query: query,
    });
  },
  get: (query: any, variables: any) => {
    return client.query({
      query: query,
      variables: variables,
    });
  },
  mutate: (mutation: any, variables: any) => {
    return client.mutate({
      mutation: mutation,
      variables: variables,
    });
  },
};
