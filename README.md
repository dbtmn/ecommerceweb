# Implementation of a e-commerce application by Dila ONGUN

This app is created via [Create React App](https://create-react-app.dev/).
Shows a list of products.

# Requirements

To run this project manually, you need Node.js installed on your environment. It also includes npm.
To check if they are installed on your environment, run and see available version successfully:

    $ node --version

    $ npm --version

# Start

To start the app, run the following commands:

    $ npm install

    $ npm run start

## Languages & Tools

### JavaScript

- [React](http://facebook.github.io/react) is used as framework.

### TypeScript

- [TypeScript](https://www.typescriptlang.org/) is used.

### CSS

- [SCSS](https://sass-lang.com/) is used for styling.
- [Material-UI](https://mui.com/) is used for some of the UI components.

### State Management

- [Redux](https://redux.js.org/) is used for state management.

# Further Improvements

- Additional [Webpack](https://webpack.js.org/) configurations.

# About Design

My main concerns are readability, maintainability, reusability, clean code.

To support these concerns, I created a structure via folders:

- shared: Components
- store: Redux folders

Home page renders a list of products. There are pagination, filtering areas and sorting functionalities. 
The state is managed via Redux.

For CSS classNames, I prefer BEM naming convention.

In terms of responsiveness, page structure is supported by Grid system.

All implementation assumes this application gets bigger. So, I focused on splitting everything into pieces.
