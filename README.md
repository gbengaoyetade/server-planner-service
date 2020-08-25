# server-planner-service

### Prerequisites

This application was built with Node js so you'll need the following to get it up and running

- [Node Js](https://nodejs.org/en/download/)
- [Docker](https://docs.docker.com/docker-for-windows/install/)

## Getting Started

Clone the repository

```
$ git clone git@github.com:gbengaPS/server-planner-service.git
```

Change directory into the project

```
$ cd server-planner-service
```

Then build docker image

```
$ docker build -t <a unique image name> .
```

Run application

```
$ docker run -p 8080:8080 -d <the unique image name above>
```

## Running the tests

This application uses Jest framework
To run tests

```
$ yarn test
```

To see test coverage

```
$ yarn coverage
```

## Author

- [Gbenga Oyetade](https://github.com/gbengaPS)

## License

[MIT License](./LICENSE)
