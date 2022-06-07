const express = require("express");
const cookieParser = require("cookie-parser");
const axios = require("axios");
require("dotenv").config();

const path = require("path")
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.get("/server-addToCart", async (req, res) => {
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
}

  const config = {
    method: "post",
    url: "https://dy-api.eu/v2/collect/user/event",
    headers: {
      "DY-API-key": API_KEY_EXPERIENCE,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const resp = await axios(config);
    console.log(resp);
  } catch(err) {
    console.log("===> ", err)
  }
  
  res.send("Add to Cart!");
});

app.get("/server-addToWishlist", async (req, res) => {
  const data = {
    "user": {
      "dyid": "-4350463893986789401",
      "dyid_server": "-4350463893986789401"
    },
    "session": { "dy": "ohyr6v42l9zd4bpinnvp7urjjx9lrssw" },
    "events": [
      {
        "name": "Add to Wishlist",
        "properties": {
          "dyType": "add-to-wishlist-v1",
          "productId": "item-34454",
          "size": "XL"
        }
      }
    ]
  }

  const config = {
    method: "post",
    url: "https://dy-api.eu/v2/collect/user/event",
    headers: {
      "DY-API-key": API_KEY_EXPERIENCE,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const resp = await axios(config);
    console.log("response", resp);
  } catch(err) {
    console.log("===> ", err)
  }
  
  res.send("Add to Wishlist!");
});

app.get("/server-purchaseSurvey", async (req, res) => {
  const data = {
    "user": {
      "dyid": "-4350463893986789401",
      "dyid_server": "-4350463893986789401"
    },
    "session": { "dy": "ohyr6v42l9zd4bpinnvp7urjjx9lrssw" },
    "events": [
      {
        "name": "Filled Post-Purchase Survey",
        "properties": {
          "customerRole": "VP of Staplers",
          "experienceRating": 4,
          "likesSpecialOffers": true
        }
      }
    ]
  }

  const config = {
    method: "post",
    url: "https://dy-api.eu/v2/collect/user/event",
    headers: {
      "DY-API-key": API_KEY_EXPERIENCE,
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const resp = await axios(config);
    console.log("response", resp);
  } catch(err) {
    console.log("===> ", err)
  }
  
  res.send("Post-Purchase Survey!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
