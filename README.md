# docker-newman

Test your API with [Postman](https://www.getpostman.com/) Collections run via [Newman](https://github.com/postmanlabs/newman) in a Docker Container.

1. Export collection and environments using the Postman app.
1. Save files in the following structure:
    ```text
    ├── my-api
    │   └── postman
    │       ├── collections
    │       │   └── my-api-collection.json
    │       └── environments
    │           ├── development.json
    │           ├── production.json
    │           ├── staging.json
    │           └── test.json
    ```

## Usage

Run container, mounting your postman directory as a volume:

```bash
# defaults to running tests against production
docker run --rm -it -v `pwd`/test/postman:/app/postmanbrandondoran/newman

# Specify NODE_ENV to run against a different environment
docker run --rm -it -e NODE_ENV=staging -v `pwd`/test/postman:/app/postmanbrandondoran/newman
```
