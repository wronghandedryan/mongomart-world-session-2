exports = function(changeEvent) {
  url = buildUrl("scott"); //replace by your user ID
  authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6IioiLCJyZXNvdXJjZSI6IioifQ._viQA2NCz5tLdzzQF7dPTaWXvQLNrXzHenbrWvlajUM"; // replace by your auth token
  sendNotifications(url, authToken, changeEvent);
};

function buildUrl(userId) {
  return "https://us-east-api.stream-io-api.com/api/v1.0/feed/notification/" + userId + "/?api_key=a2h6fsbzmqu2";
}

function sendNotifications(url, authToken, changeEvent) {
  const req = buildHttpRequest(url, authToken, changeEvent);
  
  return context.http.post(req).then(resp => {
    if (resp.statusCode === 200 || resp.statusCode === 201) {
      console.log("Successfully added notification");
      console.log(resp.body.text());
      return resp.body.text();
    } else {
      console.error("Stream.io returned an error: " + resp.body.text());
    }
  }).catch((err) => {
    console.error("Error while doing POST request: " + JSON.stringify(err));
  });
}

function buildHttpRequest(url, authToken, changeEvent) {
  return {
    "url": url,
    "headers": {
      "Content-Type": ["application/json"],
      "Authorization": [authToken],
      "Stream-Auth-Type": ["jwt"]
    },
    "encodeBodyAsJSON": true,
    "body": {
      actor: "MongoMart",
      verb: "backInStock",
      object: changeEvent.fullDocument.title,
      productId: changeEvent.fullDocument._id
    }
  };
}