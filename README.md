# to-do-list using FARM stack
FastAPI handles the backend, ReactJS handles the frontend, MongoDB handles the database and Docker handles project containerization.

## Dependencies can be installed using Docker.
1. fastapi[all] installs all dependencies for fastapi.
2. motor[srv] is a asynchronous mongoDB driver for python.
3. beanie is an object document mapper for mongodb on top of motor allowing us to define our data models as python classes and provides intuitive APIs for DB operations.
4. 4. aiostream provides tools for working with asynchronous streams while dealing with large datasets or real time data.

## pyproject.toml is a new standard in python ecosystem introduced in pep58. It is designed to be a centralized config file for project projects.