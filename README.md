# bpdts-test-api
A node service which calls a heroku api

Built with Node v12.14.1

| command | does |
|---------|------|
| node src | start the service |
| npm run test | run tests with coverage in /coverage/lcov-report/index.html|

### Try it out

* http://localhost:8990/query?city=London
* http://localhost:8990/query?city=Budapest
* http://localhost:8990/query?city=Doāba
* http://localhost:8990/query?city=Do%C4%81ba&distance=100

Default distance is 50 miles. Add '&distance=150' to change it

You can also pass **lat** and **lng** params:

* http://localhost:8990/query?lat=47.2550409&lng=-1.5401497&distance=100

### Notes

Would have liked to add eslint & jsinspect but out of time

May have gone a little beyond scope here, but in general this is 
what the simple 'London' query would have to do anyway