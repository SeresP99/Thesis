# Thesis

|Function      |Command    |
|--------------|---------------|
|Start Backend |`npm run dev`  |
|Start Frontend|`npm run start`|

###Backend environment variables

`PORT=4000`  
`COOKIE_SECRET="feoisjgrdu124324"` ~> Key to token encryption  
`CLIENT_URL=http://localhost:3000`  
`NODE_ENV="development"`  
`DATABASE_NAME="Plum"`  
`DATABASE_PORT="5432"`  
`DATABASE_HOST="localhost"`  
`DATABASE_USER="postgres"`  
`DATABASE_PASSWORD="postgres"`


dependencies:
"cors": "^2.8.5",  
"dotenv": "^10.0.0",  
"express": "^4.17.2",  
"express-session": "^1.17.2",  
"jsonwebtoken": "^8.5.1",  
"nanoid": "3.0.0",  `4.0.0 does not support commonjs imports anymore ALSO BE CAREFUL WITH UNDERSCORE (_)`  
"nodemon": "^2.0.16",  
"passport": "^0.5.2",  
"passport-google-oauth20": "^2.0.0",  
"pg": "^8.7.1"  

Note: `DO NOT TEST ON LOCALHOST`