This is the backend for our capstone project created with [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About

This Next.js application is a simple backend application that allows authenticated users to view a list of profiles for deltians and a specific deltian profile.
To accomplish this, we have Two endpoint that allows a user to be authenticated.

1. The first endpoint is a graphQL mutation endpoint that allows to create an account.

2. The second endpoint is a graphQL mutation endpoint that allows an already existing user to login by providing email and password

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) to see the GraphQL playground and you can start interracting with the API's using graphQL Query and Mutation Methods

## Tech Used

1. Next.js - For setting up backend endpoint using graphQL
2. Apollo Server - For Creating a graphQL based server for intercepting and responding to API request
3. MongoDB - For data storage.
4. bycrypt - For securely saving users password as 'hash' in our database and for retrieval
5. Jsonwebtoken - For generating tokens and verify tokens supplied, also used to ensure our endpoints are authenticated.
