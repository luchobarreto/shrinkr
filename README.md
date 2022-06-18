# Shrinkr.
Shrink is a **URL shortener** working with **React** and **Google Cloud Storage**. The idea of this project is to use only one front-end code that is able to run perfectly with different servers made with different programming languages and databases. Now it's only starting with TypeScript, Node.js, MongoDB, and Redis, but with time I'll add other languages and databases like:
- Java, Spring, and MySQL
- Python, Django, and  PostgreSQL
- PHP, Lavarel, and SQL Server.

------------

## How to install
#### Prerequisites
To install this project you should have a Google Cloud account, MongoDB, Redis, and Node.js installed.
#### Node.js/MongoDB
1. Clone the project
2. Go to the frontend folder and install all the packages using `npm install`.
3. Go to backend > node-mongo and install all the packages using `npm install`.
4. Create a Google Service Account in your Google Cloud project and save a JSON key as key.json in the root of "node-mongo". See https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating
5. Set all the environment variables.
6. Start the server running `npm start` in "node-mongo".
7. Start the frontend server running `npm start` in "frontend".

------------

Please comment on any constructive feedback. I'll appreciate it.
