echo Buildin the go server...
go build ./server/main.go
echo Starting the go server...
./server/server
echo Go server started
echo Attempting to build the frontend
cd website
npm run build
echo Front-end built, ready to be served
