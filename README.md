# Kindness App

This is a small Next.js app that uses PostgreSQL to store
users, visits, and projects.

It allows many people to sign up for projects on specific
days.

## Setup

1. Run the migrations found in the migrations folder.

   To get the app running, but without any data, only run
   `001-initial-schema.sql`, if you want test data, also run
   `002-seed-data.sql`. The other migrations are really just
   reference files.

   Currently, you have to manually enter these into `psql`

2. Build the app using `yarn build`.

3. Serve the app using `yarn start`

Alternatively, you can just use `yarn dev` to launch a
development server.
