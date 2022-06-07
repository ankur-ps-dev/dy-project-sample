const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = 3001;
const API_KEY = process.env.REACT_APP_DY_API_KEY;
const API_KEY_EXPERIENCE = process.env.REACT_APP_DY_API_KEY_EXPERIENCE;

app.use(cookieParser());
app.use((req, res, next) => {
  console.log("Hello");
  const dyCookie = req.cookies["_dyid"];
  res.cookie("_dyid_server", dyCookie, {
    maxAge: 31540000000,
  });
  next();
});

app.get("/", async (req, res) => {
  console.log("===> ",API_KEY)
  const data = {
    "user": {
      "dyid": "-4350463893986789401",
      "dyid_server": "-4350463893986789401"
    },
    "session": { "dy": "ohyr6v42l9zd4bpinnvp7urjjx9lrssw" },
    "events": [
      {
        "name": "Add to Cart",
        "properties": {
          "dyType": "add-to-cart-v1",
          "value": 39.95,
          "currency": "GBP",
          "productId": "item-34454ga",
          "quantity": 1
        }
      }
    ]
  };

  const config = {
    method: "post",

    url: "https://dy-api.eu/v2/collect/user/event",

    headers: {
      "DY-API-key": API_KEY_EXPERIENCE,
      "Content-Type": "application/json",
    },

    data: data,
  };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })

  //     .catch(function (error) {
  //       console.log(error);
  //     });
  try {
    const resp = await axios(config);
    console.log(resp);
  } catch(err) {
    console.log("===> ", err)
  }
  
  res.send("Hello World!");
});
app.get("/test", (req, res) => {
  res.send("Hello Test!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
