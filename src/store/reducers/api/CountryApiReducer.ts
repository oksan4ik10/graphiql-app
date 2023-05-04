import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IStrQuery {
  strCode: string;
  varUser?: string;
}

export const countryAPI = createApi({
  reducerPath: 'countryAPI',
  tagTypes: ['Countries'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://countries.trevorblades.com' }),
  endpoints: (builder) => ({
    fetchGetDateCountries: builder.query<IStrQuery, IStrQuery>({
      query: ({ strCode, varUser }) => {
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
