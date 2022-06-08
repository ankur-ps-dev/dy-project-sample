import Directory from "../../components/directory/directory.components";
import { HomePageContainer } from "./homepage.styles";

const addToCart = async () => {
    await window.DY.API("event", {
      name: "Add to Cart",
      properties: {
        dyType: "add-to-cart-v1",
        value: 59.13,
        currency: "any supported currency code",
        productId: "item-34454",
        quantity: 1,
        size: "XL",
        cart: [{
            productId: "sku-4324-bg",
            quantity: 2,
            itemPrice: 12.34,
          },
          {
            productId: "item-34454",
            quantity: 1,
            itemPrice: 59.13
          }
        ]
      }
    });
}

const addToWishlist = async () => {
  await window.DY.API("event", {
    name: "Add to Wishlist",
    properties: {
      dyType: "add-to-wishlist-v1",
      productId: "item-34454",
      size: "XL"
    }
  });
}

const satisfactionSurvey = async () => {
  await window.DY.API("event", {
    name: "Satisfaction Survey",
    properties: {  
      CustomerSupport: "Satisfied",
      Shipping: "Very satisfied"
    }
  })
}

const HomePage = () => {
  return (
    <HomePageContainer>
      <div>
        <h1>Client Side Events</h1>
        <button type="submit" onClick={addToCart} style={{color: "green", padding: "5px", margin:"5px"}}>Pre-defined Add To Cart!</button>
        <button type="submit" onClick={addToWishlist} style={{color: "green", padding: "5px", margin:"5px"}}>Pre-defined Add To Wishlist!</button>
        <button type="submit" onClick={satisfactionSurvey} style={{color: "blue", padding: "5px", margin:"5px"}}>Custom Satisfaction Survey!</button>
        <br /> <br />
      </div>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
