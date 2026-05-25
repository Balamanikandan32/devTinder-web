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

## PART -- 4

- Implement user connection page - setup connection slice and render the user connections
- Implement user connection request page - setup request slice and render the requested users and did the accept and reject logic.

### SUMMARY - PART -- 4

- Implemented user connection and request page.

## PART -- 5

- Implement user interest and ignore logic on the feed page.
- Implement sign up page. Here we do this as separate page, we can also conditionally render sign up form in login page as well.

### SUMMARY - PART -- 5

- Implemented user interest, ignore logic on feed page and implementee sign up page.

# DEPLOYMENT

- Created a aws account
- Launch a ec2 instance - in that create key pair login .pem file
- Connect to your instannce uing ssh client method
  -- chmod 400 "devTinder-secret-token.pem. Run this command on the key pair .pem file saved location
  -- ssh -i "devTinder-secret-token.pem" ubuntu@ec2-13-211-253-162.ap-southeast-2.compute.amazonaws.com. Run this command to connect to yor instance
- Install node on the virtual machine. Install the node verison that your current project used on the virtual machine.
- Clone the devTinder, devTinder-web in virtual machine using git command , git clone ....

- FRONTEND DEPLOY ON THE EC2
  - Create a build folder (before that we get git clone so we don't have the node_module, so run npm i and then build the frontend)
  - we use ngnix for web server
    -- update the virtual machine - sudo apt update
    -- install the ngnix - sudo apt install nginx
    -- start the ngnix - sudo systemctl start nginx
    -- sudo systemctl enable nginx - it configures the system so that Nginx automatically starts whenever the server boots.
  - Copy the build folder and paste in the ngnix server(it is present in /var/www/html).
  - sudo scp -r dist/\* /var/www/html - this command copy the file in dist folder and paste in the /var/www/html.
  - The moment you run sudo systemctl start nginx, Nginx hooks directly into Port 80 by default.
  - Even though Nginx is successfully running on Port 80 inside your Ubuntu server, AWS blocks all outside traffic by default for safety. If you try to visit your IP address right now in a browser, it might just infinitely spin and time out.
    -- To fix this, you have to open the front gate in your AWS Dashboard:
    -- Go to your AWS EC2 Console.
    -- Click on your running instance and look at the tabs at the bottom. Click on Security.
    -- Click on your Security Group link.
    -- Click Edit inbound rules.
    - Add a new rule with these exact settings:
      -- Type: HTTP
      -- Port Range: 80
      -- Source: Anywhere-IPv4 (0.0.0.0/0)
      -- Save the rules.
    - Once that inbound rule is saved, anyone in the world typing your EC2 Public IP address into their browser will hit your Nginx server, and see your application live!
- BACKEND DEPLOY ON THE EC2
  - As we clone the backend on the ec2 instace, it does not have node_module so run the command to install the modules - npm i
  - Now run the application - npm run start.
  - Similar to frontend, you must add the inboud rule in ec2 instance.
  - If you start your app with npm start, it will close the moment you disconnect from SSH(either by closing the terminal window or terminating the connection to the EC2 instance). To keep it running 24/7, use a process manager like PM2.
    -- Install pm2 - npm install pm2 -g
    -- start the backend app with pm2 with pm2 name as devTinder - pm2 start npm --name "devTinder" -- start
    -- some of the pm2 commands- pm2 list, pm2 stop <pm2 name>, pm2 delete <pm2 name>
  - Set Up a Reverse Proxy (Nginx) -- why? explained below
    -- Open the configuration file of ngnix - sudo nano /etc/nginx/sites-available/default
    -- Add this to that file
    -- server_name 13.211.253.162:3000; # Change domain name to your domain name
    -- location /api/ {
    -- proxy_pass http://13.211.253.162:3000/; # Change domain name to your domain name nd 3000 to your app's port
    -- proxy_http_version 1.1;
    -- proxy_set_header Upgrade $http_upgrade;
    -- proxy_set_header Connection 'upgrade';
    -- proxy_set_header Host $host;
    -- proxy_cache_bypass $http_upgrade;
    -- }
    -- Save the file and restart Nginx - sudo systemctl restart nginx

- Base_URL IS changed temporary, once .env file is learned we can modify the Base_URL

Frontend = http://13.211.253.162/
Backend = http://13.211.253.162:3000/

Mapping ip to domain name 13.211.253.162 -- devTinder

Frontend = http://devTinder/
Backend = http://devTinder:3000/ -- in production websites, exposing port numbers in the URL is usually avoided.

<!-- so we used to map the devTinder:3000 (/) 13.211.123.162:3000 to devTinder/api/ (/)  13.211.123.162/api  -->
<!-- To achive this we uses nginx reverse proxy -->
