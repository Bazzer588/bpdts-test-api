# bpdts-test-api
A node service which calls a heroku api

Built with Node v12.14.1

| command | does |
|---------|------|
| node src | start the service |
| npm run test | run tests with coverage in /coverage/lcov-report/index.html|

###Try it out

* http://localhost:8990/query?city=London
* http://localhost:8990/query?city=Budapest
* http://localhost:8990/query?city=Doāba
* http://localhost:8990/query?city=Do%C4%81ba&distance=100

###Notes

Would have liked to add eslint & jsinspect but out of time
