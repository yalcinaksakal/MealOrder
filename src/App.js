import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";

function App() {
  const [isCartShown, setIsCartShown] = useState(false);

  const showCartHandler = () => setIsCartShown(true);
  const hideCartHandler = () => setIsCartShown(false);
  return (
    <>
      {isCartShown && <Cart />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
