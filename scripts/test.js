import http from "k6/http";
import { check, sleep } from "k6";
import { uuidv4 } from "https://jslib.k6.io/k6-utils/1.0.0/index.js";

export let options = {
  duration: "30s",
};

export default function () {
  const requestId = uuidv4();
  const response = http.get("https://swapi.dev/api/people/30/", {
    headers: { Accepts: "application/json", "X-RequestId": requestId },
  });
  check(response, { "status is 200": (r) => r.status === 200 });

  if (response.status !== 200) {
    console.log(response.status, requestId);
  }

  sleep(0.3);
}
