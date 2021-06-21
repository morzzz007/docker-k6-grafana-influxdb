import http from "k6/http";
import { check, sleep } from "k6";
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

export let options = {
  vus: 1,
  duration: "30s",
};

export default function () {
  const requestId = uuidv4();
  const url = "...";
  const payload = JSON.stringify({
    sleep_for_milliseconds: Math.floor(Math.random() * 300),
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
      Accepts: "application/json",
      "x-request-id": requestId,
    },
  };

  const response = http.post(url, payload, params);
  check(response, { "status is 200": (r) => r.status === 200 });

  if (response.status !== 200) {
    console.log(response.status, requestId);
  }
}
