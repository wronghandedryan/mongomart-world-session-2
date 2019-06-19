// replace with your Stitch app ID
const stitchAppId = 'YSTITCH_APP_ID';

// replace with your Stream Auth-token
const streamSettings = {
    authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY3Rpb24iOiIqIiwiZmVlZF9pZCI6Im5vdGlmaWNhdGlvbnJvYmJlcnQiLCJyZXNvdXJjZSI6ImZlZWQifQ.t-QyCjMWZmctow6UQrUipwEdcYWhN2358Pwt_ZqTO0A",
    userId: "robbert",
    baseUrl: "https://us-east-api.stream-io-api.com/api/v1.0/feed/notification/",
    apiKeySuffix: "/?api_key=a2h6fsbzmqu2" 
};

const streamRequestOptions = {
    method: 'GET',
    url: streamSettings.baseUrl + streamSettings.userId + streamSettings.apiKeySuffix,
    headers: {
      "Content-Type": "application/json",
      "Stream-Auth-Type": "jwt",
      "Authorization": streamSettings.authToken
    }
};

// replace with Stitch server names of the linked cluster(s)
// can use the same name for all three if products, reviews and users are stored on the same cluster
const stitchClusterNames = {
    products: 'mongodb-atlas',
    reviews: 'mongodb-atlas',
    users: 'mongodb-atlas'
};

// database and collection names if different from defaults used in instructions
const dbName = 'mongomart';
const collNames = {
  item: 'item',
  users: 'users',
  reviews: 'reviews'
}

// image URL
const baseImgUrl = 'https://raw.githubusercontent.com/robbertkauffman/mongomart/master/public';

export { stitchAppId, streamSettings, streamRequestOptions, stitchClusterNames, dbName, collNames, baseImgUrl };