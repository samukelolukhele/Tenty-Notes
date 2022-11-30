# Tenty Notes

A web application made for taking and sharing notes for revision. This app utililzes ReactTS for the client side and NestJS for the server. The server implements JWT authentication, Google Cloud Storage for user profile images and PostgreSQL for the database.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Authors

- [@samukelolukhele]

## Installation

Install my-project with npm

```bash
 cd client
 npm i
```

```bash
 cd server
 npm i
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

### Server Side Variables

`POSTGRES_PORT`

`POSGRES_HOST`

`POSTGRES_USER`

`POSTGRES_DATABASE`

`POSTGRES_PASSWORD`

`JWT_SECRET`

`CLIENT_URL`

#### Google Cloud Storage Credentials

`GCS_PROJECT`

`GCS_BUCKET`

`GCS_CLIENT_EMAIL`

`GCS_PRIVATE_KEY`

### Client Side Variables

`VITE_SERVER_URL`
