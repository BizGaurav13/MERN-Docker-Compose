# MERN Stack Application

This is a simple MERN (MongoDB, Express, React, Node.js) stack application with Docker support for easy development and deployment.

## Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- Docker Compose

## Step 1: Create a Docker Network

First, create a Docker network to allow the containers to communicate with each other:

```sh
docker network create demo
```

## Step 2: Build and Run the Client

### 2.1 Build the Client

Navigate to the frontend directory and build the Docker image for the client:

```sh
cd mern/frontend
docker build -t mern-frontend .
```


### 2.2 Run the Client

Run the client container and expose it on port 5173:

```sh
docker run --name=frontend --network=demo -d -p 5173:5173 mern-frontend
```

### 2.3 Verify the Client is Running

Open your browser and visit http://localhost:5173 to see the client in action.

## Step 3: Run the MongoDB Container

### 3.1 Start MongoDB

Run the MongoDB container and map it to port 27017:

```sh
docker run --network=demo --name=mongodb -d -p 27017:27017 -v ~/opt/data:/data/db mongodb:latest
```

Note: The ```-v ~/opt/data:/data/db``` option is used to persist data on your local machine. You can adjust the path as needed.

## Step 4: Build and Run the Backend

### 4.1 Build the Backend

Navigate to the backend directory and build the Docker image for the server:

```sh
cd mern/backend
docker build -t mern-backend .
```

### 4.2 Run the Backend

Run the backend container and expose it on port 5050:

```sh
docker run --name=backend --network=demo -d -p 5050:5050 mern-backend
```

### Step 5: Using Docker Compose

If you prefer to use Docker Compose to manage your containers, you can do so with the following command:

```sh
docker compose up -d
```

This will automatically build and run all the necessary containers (frontend, backend, and mongodb) for you.
