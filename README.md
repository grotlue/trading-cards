# Trading Cards Showcase

This web app showcases trading cards using the following API: https://docs.magicthegathering.io/#api_v1cards_list.

## App Functionality
### Main components
- `<ShowCase>`: Responsible for fetching a paginated card list & managing state shared by `<Filters>`, `<CardList>`.
- `<Filters>`: Handles filtering logic and updates the API url based on filters for names and colors.
- `<CardList>`: Simple component, which displays a loading state, a list of `<Card>`s & and an error message, if given.
- `<Card>`: Displays the "front side" of the card by default with basic information. Handles the card click which will fetch card details and display them on the "back side".


## Running & using the app
**ℹ️ The following scripts must be run in the project directoy.**

### Prerequisites
To run this application make sure you have stable versions of [Node.js 16.15.x](https://nodejs.org/en/) and [npm](https://nodejs.org/en/)/[yarn](https://classic.yarnpkg.com/lang/en/docs/install) installed. 

### Run the app locally
- Run `npm install` to install all dependencies
- `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Linting and Formatting

- Run `npm run lint` to check the code with eslint.
- Run `npm run format` to format with prettier.


#### Testing

- `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### Generate the production build

- `npm run build` builds the app for production to the `build` folder.

## Technologies used
This application uses:
- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for tests
- [ESLint](https://eslint.org/) for linting
- [Prettier](https://prettier.io/) for code formatting
- [Husky](https://typicode.github.io/husky/#/) for pre-commit code formatting hooks

...and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
