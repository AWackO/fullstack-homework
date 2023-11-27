# fullstack-homework
Go with CHI + React Typescript home assignment made with create-react-app my-app --template typescript
I have made a an upstream api in GO that fetches the data from provided url and prepares the data that we need. With that the GO server provides endpoints to react application with the place data and the ids for those places. In the react app we can choose a place we want to check out via the dropdown menu and the card with info of the place will appear.
# Backend instructions
For the backend you should install GO (https://go.dev/doc/install)
then change directory in your terminal to the backend folder and run the "go install" command to install packages and dependecies.
after that run the command "go run main.go" to run the GO server, it will start on the 8080 port (can be changed in main.go file)

# Frontend instructions
For the frontend after you have chnge the directory via your terminal to the frontend folder, run "npm install" command to install all dependencies
after the installation was completed you can run "npm start" command to start the frontend, it will automatically start at the port 3000 (can be changed in package.json file)
