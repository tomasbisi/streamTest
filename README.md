This is a Data Visualization Dashboard made in REACT JS for monitoring stream and usage analytics

## How to install

### Dependencies
```
React: 16.2.0
Python: 2.7.10
Jquery: 3.2.1
Node: 8.7.0
React-highcharts: 15.0.0
```

On a Terminal run the following code:
```
# Clone the repository
git clone https://github.com/tomasbisi/streamTest
cd streamTest

# Build dependencies
npm install

# Launch app
npm start

```

The client will run on port 3000. Copy the following url in your browser:
```
http://127.0.0.1:3000
```

On a new Terminal window you will need to run the Python server for the client
to request the json files:
```
cd streamTest
python server.py
```
The server is running on port 8000.