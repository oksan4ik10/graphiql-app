import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

interface IStrQuery {
  strCode: string;
  varUser?: string;
  headers?: string;
}

interface IResponseData {
  data: {
    dataResponse: object;
    error?: [];
  };
}

export const countryAPI = createApi({
  reducerPath: 'countryAPI',
  tagTypes: ['Countries'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://countries.trevorblades.com' }),
  endpoints: (builder) => ({
    fetchGetDateCountries: builder.query<IResponseData, IStrQuery>({
      query: ({ strCode, varUser, headers }) => {
        if (varUser && headers) {
          return {
            url: `/`,
            headers: {
              headers: Object.assign({ 'Content-Type': 'application/json' }, JSON.parse(headers)),
            },
            method: 'POST',
            body: JSON.stringify({
              query: strCode,
              varibales: JSON.parse(varUser),
            }),
          };
        }
        if (varUser) {
          return {
            url: `/`,
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              query: strCode,
              variables: JSON.parse(varUser),
            }),
          };
        }
        if (headers)
          return {
            url: `/`,
            headers: Object.assign({ 'Content-Type': 'application/json' }, JSON.parse(headers)),
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
