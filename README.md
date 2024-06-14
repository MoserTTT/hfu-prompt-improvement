# Running the hfu-prompt-improvement Software

## Preparation

### Environment Setup

Before starting, ensure you have set the `EF_API_KEY` environment variable. This should contain your Azure OpenAI key for the Ada 2 deployment.

### Docker Installation

Make sure Docker is installed and running on your system. If not installed, you can download Docker from [here](https://www.docker.com/products/docker-desktop).

### Navigate to Project Directory

Navigate to the directory `HFU-PROMPT-IMPROVEMENT` (default).

## Starting the Application

To start the application using Docker Compose:

```sh
docker-compose up
```

This command will pull the necessary Docker images (if not already present) and start the application.

## Building and Starting Fresh

If you have made changes to the code and need to rebuild the Docker images before starting:

```sh
docker-compose up --build
```

## Accessing the User Interface (UI)

Once the application is running, you can access the user interface at [http://localhost:5173](http://localhost:5173).
