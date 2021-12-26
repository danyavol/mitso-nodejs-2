# mitso-nodejs-2

This is a simple RestAPI server built with Node.js, Express and PostgreSQL. It has authorization via JWT tokens, logging and error handling. 
Also I'v used Docker to simplify deployment and development processes.

## Prerequisites
- Git - [Download & Install Git](https://git-scm.com/downloads)
- Docker Engine - [Download](https://docs.docker.com/engine/install/)

## Downloading

```
git clone {repository URL}
```

## Running application via Docker
Run in terminal:

```
 docker-compose up
```
If you want to stop, press the keyboard shortcut first **Ctrl+C**, then enter in the terminal:
```
 docker-compose down
```
Rebuild images & start containers:
```
 docker compose up --build 
```
