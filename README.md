# Northcoders News API

## Link to hosted version

```
https://s-be-nc-news.herokuapp.com/api
```

## Introduction

This project is a web API serving JSON data for a news website.
It consists of articles, comments, topics, and users information

## Initial instructions

On GitHub.com, navigate to the main page of the repository

Fork the repo

Above the file, copy the URL for the repository

Open Terminal

Change the current working directory to the location where you want the cloned directory

Type git clone, and then paste the URL you copied earlier

```
cd <my folder>
git clone <copied url here>
```

INSTALL DEPENDENCIES

You can download dependencies from package.JSON by entering the following command:

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

The package.json file contains the following script:

```
"seed": "node ./db/seeds/run-seed.js"
```

You can run this script by entering the following command which will initialise and seed the database:

```
npm run setup-dbs
npm run seed
```

VIEW DEV DATABASE

The package.json file contains the following script:

```
 "view-dev-db": "psql -f ./view-dev-db.sql > dev-db.txt"
```

You can run this script by entering the following command:

```
npm run view-dev-db
```

The output of your PSQL query will be within the file:

```
dev-db.txt
```

You can enable the testing suite by entering the following command:

```
npm run test
```

## Dependencies

Below are the list of dependencies installed from the package.JSON:

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

## Minimum versions

```
Node: v17.7.2
NPM: 8.9.0
Postgres: v14.2
```
