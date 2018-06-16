# Bang & Olufsen Web Controller

This application allows you to control the volume of Bang & Olufsen NL products via the API.

## Getting Started

The application runs in  a docker image.

### Development
```
git clone https://github.com/ernebronk/beo-web-control.git
npm install
docker-compose up
```

Visit http://localhost:9001

### Production

```
git clone https://github.com/ernebronk/beo-web-control.git
npm install
docker build -t music_server .
docker run -p 80:9001 -d --name music_server music_server
```

Visit http://localhost:9001


## Authors

* **Erné Bronkhorst**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
