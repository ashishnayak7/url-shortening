# URL Shortener
URL Shortening Service

Software Pre-requisites

1. Docker Desktop


## Steps to run in LOCAL

1. Clone repository
2. Start Docker Desktop
3. Open terminal and change directory to the cloned repo.
4. Rename `sample.env` to `.env`
5. At the root of the repo, type in `docker-compose up`
6. This should start the NodeJS backend service and the Postgres DB
7. Connect to the local Postgres DB
8. Create a table using the command:

```
CREATE TABLE IF NOT EXISTS url_store (
   long_url varchar,
   shortUrl varchar,
   url_code varchar,
   date date
);
```

## Steps to deploy

1. Can be deployed as container into a K8s cluster.
