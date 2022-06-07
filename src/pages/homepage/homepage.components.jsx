import Directory from "../../components/directory/directory.components";
import { HomePageContainer } from "./homepage.styles";

const handleClickButton = async () => {
  await window.DY.API("event", {
    name: "Add to Wishlist",
    properties: {
      dyType: "add-to-wishlist-v1",
      productId: "item-34454",
      size: "XL"
    }
  });
}
const HomePage = () => {
  return (
    <HomePageContainer>
      <button type="submit" onClick={handleClickButton}>Click me</button>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
