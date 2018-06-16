# Bang & Olufsen Web Controller

This application allows you to control the volume of Bang & Olufsen NL products via the API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Development
```
git clone
docker-compose up
```

### Production

```
docker build -t music_server .
docker run -p 9001:9001 -d --name music_server music_server
```

## Authors

* **Erné Bronkhorst**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
