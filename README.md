# Housing Management Application

## Overview

This project is a simple web application for a housing company to display and manage houses they want to sell. The application allows anonymous users to view and filter houses and provides admin functionality to create and update house details after logging in.

## Features

### Anonymous User

- View a list of houses grouped by house design model.
- Filter houses based on house number, block number, land number, minimum price, and maximum price.

### Admin User

- Log in with a username and password.
- Create and update house details.
- Log out.

## Technologies Used

### Frontend

- Angular (version 14+)
- TypeScript
- NgRx for state management
- RxJS for reactive programming
- ng-bootstrap for UI components

### Testing

- Cypress for E2E testing
- Jasmine/Karma for unit testing

## Setup Instructions

### Clone the Repository

link of repository on bitbucket
https://bitbucket.org/yousraraedamer/housingapp/src/master/

```
git clone git@bitbucket.org:yousraraedamer/housingapp.git
```

```
git checkout master
```

### Install Dependencies

```
npm install
```

### Run the Application

```
npm start
```

Open your browser and navigate to http://localhost:4200. The application will automatically reload if you change any of the source files.

### Environment Configuration

Ensure the API URL and other configurations are correctly set in
`src/environments/environment.ts`

## Running Tests

### Unit Tests

Unit tests are written using Jasmine and Karma. To run the unit tests, use the following command:

```
npm start
```

### E2E Tests

E2E tests are written using Cypress. To run the Cypress tests, follow these steps:

1- Start the Angular Application

```
npm start
```

2- Run Cypress

```
npx cypress open
```
