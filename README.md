# docker-newman

Test your API with [Postman](https://www.getpostman.com/) Collections run via [Newman](https://github.com/postmanlabs/newman) in a Docker Container.

## Usage

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
1. Run the container, mounting your postman directory as a volume:

    ```bash
    docker run \
      --rm \
      -it \
      -v `pwd`/postman:/postman \
      brandondoran/newman -e env/production.json collection.json

    ```

## Advanced

Pass any of newman's [supported CLI options](https://www.npmjs.com/package/newman#cli-reporter-options) to the docker run command.

### Example

Export a json report to test/reports/test-results.json on the host file system:

```bash
docker run \
  --rm \
  -it \
  -v `pwd`/test/postman:/postman \
  -v `pwd`/test/reports:/reports \
  brandondoran/newman \
  -e env/production.json \
  --reporters json \
  --reporter-json-export /reports/test-results.json \
  collection.json
```
