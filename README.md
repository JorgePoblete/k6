# Load testing with k6

This repo is suited for you to start doing some load testing using [k6](https://k6.io), it contains all the basics and more.

In this repo you will find:

- a way to run k6 test script files using docker
- an already up and running integration with influxdb and grafana
- an already setup grafana dashboard
- a way to run load testing from various machines at once, where all the machines in te network run the same script at the same time

## Getting started

So in order to start testing you need a test script, in this repo is provided a simple test that will ramp up to 100 rps in 10 minutes (10 each minute)

before you run any test you need to start up the testing session by running:

```
make start
```
then, to run it you can just execute

```
make run test=tests/example.js
```

at any moment you can check how the test is doing on the grafana provided dashboard by accessing `http://localhost:3000` on your prefered browser

all the test data and result resume is exported into csv and json format so you can also check it with your prefered tool.

to end your test session, you just need to run

```
make stop
```

The test results are preserved on your disk, so for example, to re review the previous test results in grafana, you can start a test session again by running `make start`, and then checking grafana on `http://localhost:3000`, then just search for the time period when you run your test.

## How to run test using various machines

*First of all, this assumes that you have a main pc and some slave pcs, and that you have the ip address of all the pcs and red access to everyone of them, and that all the pcs are running a copy of this repo and your test script.*

To run a test in wich you use various pcs to provide more load to the sistem, first you need to make your test to start in a paused state by changing the corresponding variable in the test script:

```javascript
paused: true
```

then you need to start a test session by running:

```
make start
```

then you need to run:

```
make run test=tests/example.js influxdb=http://HOST_WHERE_METRICS_WILL_BE_SAVED:8086
```

Run that command on all the machines that will be used.

Then on the main pc, run:

```
make resume hosts=HOST_IP_1,HOST_IP_2,HOST_IP_3,HOST_IP_4,...
```

this will make the test to start running on all the hosts.