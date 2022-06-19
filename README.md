# Fund your Foodbank

## _A donation subscripton service to and for your local Foodbanks_

## Features

-   The donor selects foodbanks local to them to donate to.
-   Donation is split for the selected foodbanks.
-   Foodbanks get monthly emails reminding them to fill out a form on Fund my Foodbank website.
-   Foodbank only has to fill out 1 form and all the donors are emailed automatically when the form is submitted.
-   The donor gets monthly updates from the foodbank they are donating to.
-   Foodbank get email notifications about users who subscripe.

## Tech

Fund your Foodbank uses the technologies listed below to fully function:

-   [ReactJS] - Frontend development.
-   [NextJS] - React framework for server side rendering.
-   [Prisma] - Open source ORM for the database.
-   [PostgreSQL] - Our database.
-   [node.js] - Backend server.
-   [Vercel] - For Hosting.
-   [GitHub] - For Repository and CI/CD pipeline.
-   [GoogleAPI] - For maps and places data API.

## How the subscription works

User selects the foodbank the would like to donate to from their local area.

-   A checkout session is created on the backend using the token from Stripe.
-   The token is passed to the frontend which redirects to stripe payment gateway.

```
    const accountLink = await stripe.accountLinks.create({
        account: 'acct_1032D82eZvKYlo2C',
        refresh_url: 'https://example.com/reauth',
        return_url: 'https://example.com/return',
        type: 'account_onboarding',
        });
```

-   When the stripe flow is finished an email is sent to the foodbank.
-   Donor is redirected to payment success page.

## Installation

Fund my Local Foodbank requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd fund-my-foodbank
npm i
npm run dev
```

For production environments

```sh
npm run build
```

## Development

Want to contribute? Great!

Follow the installation instruction then,
open your favorite Terminal and run these commands.

```sh
npm run dev
```

After starting your server, work on some features and then raise a PR to this repo. It will get picked up by one of the team members.

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[nextjs]: https://nextjs.org
[typescript]: https://www.typescriptlang.org
[googleapi]: https://developers.google.com/apis-explorer
[node.js]: http://nodejs.org
[reactjs]: https://reactjs.org
[vercel]: https://vercel.com/dashboard
[github]: https://github.com
[prisma]: https://www.prisma.io
[postgresql]: https://www.postgresql.org

##
