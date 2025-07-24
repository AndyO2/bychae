# Food Cart Website

A modern, responsive food cart website built with React and TypeScript. Features include online ordering, menu display, hours and location, and Square API integration.

## Environment Setup

Before running the application, you need to set up your environment variables:

1. Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and add your API keys:
   ```bash
   # Square API Configuration
   REACT_APP_SQUARE_APPLICATION_ID=your_square_application_id_here
   REACT_APP_SQUARE_LOCATION_ID=your_square_location_id_here
   REACT_APP_SQUARE_ACCESS_TOKEN=your_square_access_token_here
   REACT_APP_SQUARE_ENVIRONMENT=sandbox

   # Google Maps API Configuration
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   ```

### Getting API Keys

**Square API:**
- Go to [Square Developer Dashboard](https://developer.squareup.com/)
- Create a new application
- Get your Application ID, Location ID, and Access Token

**Google Maps API:**
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing one
- Enable "Maps Embed API"
- Create credentials (API key)
- Restrict the API key to your domain for security

### Security Notes
- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- Restrict your API keys to your domain in the respective developer consoles

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
