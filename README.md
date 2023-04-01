# Library App Frontend

This is a frontend application for the Library App REST API. It is built with Vite, TypeScript, React, React Query, React Router, Axios, React Hook Form, Zod, and Chakra UI.

## Installation

To install the frontend, clone the repository and navigate to the project directory. Then, run the following command:

``` js
    npm install
```

This will install all of the necessary dependencies.

## Usage

To start the frontend, run the following command:

``` js
    npm run dev
```


This will start the development server and open the application in your default browser.

The application provides a user interface for interacting with the Library App REST API. Users can perform CRUD operations for books, authors, categories, and users. Certain routes used with React Router are authorized and can only be accessed by admins. If a user who is not logged in or who does not have admin privileges attempts to access an authorized route, they will be redirected to an authorization error page.

## Dependencies

The frontend application relies on the following dependencies:

- Vite: A build tool that serves the application in development and builds it for production.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
- React: A JavaScript library for building user interfaces.
- React Query: A library for managing and caching server state in React applications.
- React Router: A library for handling client-side routing in React applications.
- Axios: A promise-based library for making HTTP requests.
- React Hook Form: A library for building forms in React applications.
- Zod: A TypeScript-first schema validation library.
- Chakra UI: A library of accessible and reusable UI components for React.

## Authentication and Authorization

The application uses JWT tokens for authentication and authorization. Certain routes used with React Router are authorized and can only be accessed by admins. If a user who is not logged in or who does not have admin privileges attempts to access an authorized route, they will be redirected to an authorization error page.

## Contributing

Contributions are welcome! Please submit a pull request if you would like to contribute to this project.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
