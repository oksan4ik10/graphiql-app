GraphiQL-App
GraphiQL-App

Test examlpe:
query GetCountry($t:ID!) {
    country(code:$t) {
      name
      native
      capital
      emoji
      currency
      languages {
      code
      name
    }
  }
}
Variables:
{
  "t":"BR"
}
