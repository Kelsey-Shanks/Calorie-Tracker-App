# Sum Calculation Microservice

This microservice finds the sum given an array of numbers.

Deployed via **Google Cloud Run** at:
[https://sum-calculation-144095947632.us-west2.run.app](https://sum-calculation-144095947632.us-west2.run.app)

---

## Overview

The service uses REST API structure that will allow a client to:
-receive the sum given an array of numbers

---

## How to Request Data

---

const SUMMATION_MICROSERVICE_URL =
"https://sum-calculation-144095947632.us-west2.run.app";

const myValues= [1,2,3] //your array of numbers

const response = await fetch(
`${SUMMATION_MICROSERVICE_URL}/sum-calculation`,
{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ num_list: myValues }),
}
);

if (!response.ok) {
const errorText = await response.json();
console.error("Summation Calculation error:", errorJson.error);
return;
}

const result = await response.json();

---

## How to Receive Data

### Data that is sent back from a /sum-calculation request

---

json
{
"sum": "total_value",
}

---
