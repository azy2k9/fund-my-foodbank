Subscriptions to fund my foodbank

A stripe product (create this either programatically or in the dashboard)
    - have a table in the database with a bunch of product plans
        - £5 a month
        - £10 a month
        - £15 a month
        - £20 a month

Checkout experience ^ (from stripe)
     - on backend create a checkout session using stripe api (gives you a token)
     - pass the token to the frontend and then redirect to the checkout page
        - Donation page
    - https://stripe.com/docs/connect/collect-then-transfer-guide?platform=web = follow this (connect account = merchant)
    - create a stripe connect account for the foodbank (express type)
    - redirect the food bank to a verification flow (in our product -> stripe verification flow page)
        - accountLink (verify the account)     (https://connect.stripe.com/express/oauth/authorize?client_id=ca_AdFsX9nx1eF8o23XyNCO2sqw6KReyb4O&state=ot8a4xnf5z&redirect_uri=https%3A%2F%2Frocketrides.io%2Fpilots%2Fstripe%2Ftoken&stripe_user%5Bbusiness_type%5D=individual&stripe_user%5Bbusiness_name%5D=&stripe_user%5Bfirst_name%5D=&stripe_user%5Blast_name%5D=&stripe_user%5Bemail%5D=john%40j.com&stripe_user%5Bcountry%5D=US#/)

        ```
            const accountLink = await stripe.accountLinks.create({
                account: 'acct_1032D82eZvKYlo2C',
                refresh_url: 'https://example.com/reauth',
                return_url: 'https://example.com/return',
                type: 'account_onboarding',
            });
        ```
            - when the flow above is finished, handle in the webhook to notify the foodbank that their account is verified (account_updated event?)

        - webhook payment recieved from subscription
            - initiate a transfer to a connect account (check stripe connect balance and ensure you have enough before sending)
            (money can go into the holding part of the connect but you wont get paid out till you actually verify)



        - after they are verified, people can subscribe to the foodbank
        - Donation page success page

webhook - when someone new subscribes (or unsubscribes etc)
    - send email to the foodbank when someone subscribes

turn off automatic payouts to your own platform accounts (money will sit in the stripe account)

success donation page etc

