GraphiQL-App

[develop](https://github.com/oksan4ik10/graphiql-app/tree/develop)
[deploy](https://graphiql-app-rs.netlify.app/)

Test examlpe:

> query GetCountry($t:ID!) {
> country(code:$t) {
>       name
>       native
>       capital
>       emoji
>       currency
>       languages {
>         code
>         name
>       }
>     }
>   }

Variables:  

> {
>     "t":"BR"
> }
