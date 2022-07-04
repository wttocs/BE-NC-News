# Northcoders News API

## Initial Instructions

CLONE THE REPO

```
git clone
cd <my folder>
```

INSTALL DEPENDENCIES

```
npm install
```

DOTENV: CREATE 2 NEW FILES
.env.test and .env.development

.env.test - In the body of this file add:

```
 PGDATABASE=nc_news_test

```

.env.development - In the body of this file add:

```

PGDATABASE=nc_news
```

SEED THE LOCAL DATABASE

The package.json file contains the below script

```

"seed": "node ./db/seeds/run-seed.js"

```

You can run this script by using:

```

npm run setup-dbs
npm run seed

```

VIEW DEV DATABASE

The package.json file contains the below script

```
 "view-dev-db": "psql -f ./view-dev-db.sql > dev-db.txt"
```

You can run this script by using:

```

npm run view-dev-db

```

The output of your PSQL query will be within the file

```
dev-db.txt
```

## Dependencies

Below are the list of dependencies:

```
postgres
husky
express
jest
jest-extended
jest-sorted
pg-format
supertest
dotenv
```
