# Kindness App

This is a small Next.js app that uses PostgreSQL to store users, visits, and
projects.

It allows many people to sign up for projects on specific days, at configurable,
specific timeslots.

## Setup

1. Create a PostgreSQL Database `kindness`

2. Run the migrations found in the migrations folder.

   To get the app running, but without any data, only run
   `001-initial-schema.sql`, if you want test data, also run
   `002-seed-data.sql`. The other migrations are really just
   reference files.

   Currently, you have to manually enter these into `psql`

3. Create an "invisible" [google reCAPTCHA configuration](https://www.google.com/recaptcha/admin)

4. Create a `.env.local` file, and populate it with the following:

   | variable name               | description                                                              |
   | --------------------------- | ------------------------------------------------------------------------ |
   | `TOKEN_SECRET`              | random string to use as the token for authentication.                    |
   | `DB_USERNAME`               | db user's username with read / write access for the `kindness` database. |
   | `DB_PASSWORD`               | db user's password.                                                      |
   | `NEXT_PUBLIC_RECAPTCHA_KEY` | the public site key from google reCAPTCHA.                               |
   | `RECAPTCHA_SECRET`          | the secret key from google reCAPTCHA.                                    |

5. Build the app using `yarn build`.

6. Serve the app using `yarn start`

Alternatively, you can just use `yarn dev` to launch a development server.

You may also want to use [pm2](https://www.npmjs.com/package/pm2) to configure a
the application to run as a standalone process.
