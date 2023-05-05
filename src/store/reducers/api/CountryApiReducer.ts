import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IStrQuery {
  strCode: string;
  varUser?: string;
  headers?: string;
}

interface IResponseData {
  data: {
    data: object;
  };
}

export const countryAPI = createApi({
  reducerPath: 'countryAPI',
  tagTypes: ['Countries'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://countries.trevorblades.com' }),
  endpoints: (builder) => ({
    fetchGetDateCountries: builder.query<IResponseData, IStrQuery>({
      query: ({ strCode, varUser, headers }) => {
        if (varUser && headers)
          return {
            url: `/`,
            headers: {
              'Content-Type': 'application/json',
              headers,
            },
            method: 'POST',
            body: JSON.stringify({
              query: strCode,
              varibales: {
                varUser,
              },
            }),
          };
        if (varUser)
          return {
            url: `/`,
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              query: strCode,
              varibales: {
                varUser,
              },
            }),
          };
        if (headers)
          return {
            url: `/`,
            headers: {
              'Content-Type': 'application/json',
              headers,
            },
            method: 'POST',
            body: JSON.stringify({
              query: strCode,
            }),
          };
        return {
          url: `/`,
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            query: strCode,
          }),
        };
      },
      providesTags: () => ['Countries'],
    }),
  }),
});
