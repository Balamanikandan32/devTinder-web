# DEVTINDER - WEB

## PART -- 1

- Created a react template using vite build tool
- Removed unused code from the pre build project
- Initialize the project to git repository
- Install and config the tailwind css
- Install and config the daisyUI
- Create separete component folder to put all custom components
- Create a nav bar component
- Install react router
- Setup the routing using DECLARTIVE MODE IN REACT ROUTER
- During settingup the routing created separate components like header, footer, body, login, profile, nav-bar

### SUMMARY - PART -- 1

- Created a react application using vite, install and setup tailwind css, daisyUI, react-router.

## PART -- 2

- Create a login page with email aand password field and did some basic styling
- make an login api call using axios
- learn about cors and did cors config on backend code
- To store cookie on browser did config on axios call and backed code(cors options)
- Install redux toolkit and setup store, userSlice
- Dispatch the actions to userSlice in login page
- Subscribe to store by changing the navbar photourl when user sign in
- After sucessfull login, navigate the app to feed page (path is /)

### SUMMAARY - PART -- 2

- created a login form in login page, resolve cors error in backend code and config to store cookie in browser, install redux toolkit, setup redux store.
- created userSlice, dispatch action to userSlice and navbar is subscribe to store to conditionally show user name and avatar, after login navigate to feed page(path is /).

## PART -- 3

- In body component, check whether the user is logged in or not, if logged in navigate to feed page(path is /), if not logged in navigate to login page(path is /login).
- By using this, the user cannot access any other pages. (There are multiple way of using protected route this is one of the way)
- Clicking on the navbar header will navigate to feed page and also setup profile navigation when click on avatar dropdown under pofile.
- Implemented logout feature
- Setup feed slice and implement user feed card
- Implemented profile page

### SUMMARY - PART -- 3

- Make some chages in body component so that user does not logout when refreshing any other page.
- Implement logout feature, setup feed slice and implemtn user feed card and profile page.
