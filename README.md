## sentosa-frontend-fe-challange

### Project Structure
- pages
- elements
- context
- store
- helpers

### Tech Stack
- React, React-Hooks, Context, Redux, Material-UI.
- Building UI.
    - Using CSS in JS, Material UI(useStyles, withStyles) for styles
    - Mainly functional components using React-Hooks.
    - Class Component - ConvertPage
- State Management
    - CurrencyNames, CurrencyConversionRate using Context
    - Avoid Prop Drilling between Conversion History page using Redux(just for an example)
    - Handle States in components using React Hooks
- Performance
    - CurrencyConversionRate - High Performance with the specified Algorithm(caching, minimize the number of http requests)
    - Avoid re-calculation using useMemo

### How to run the project
- run
    npm start

- build
    npm run build
