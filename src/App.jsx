import { useState } from "react"
import Footer from "./components/Footer"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./db/db"

const App = () => {

  const [data] = useState(db);
  const [cart, setCart] = useState([]);

  function addToCart(guitar){
    const itemExist = cart.findIndex(item => item.id == guitar.id);
    if (itemExist == -1){
      setCart([...cart, {...guitar, quantity: 1}])
    }else{
      const updateCart = [...cart];
      updateCart[itemExist].quantity++;
      setCart(updateCart);
    }
  }

  function removeToCart(guitar){
    const itemExist = cart.findIndex(item => item.id == guitar.id);
    const updateCart = [...cart];
    if(updateCart[itemExist].quantity > 0)
    {
      updateCart[itemExist].quantity--;
      setCart(updateCart);
    }
  }

  return (
    <>
    <Header
     cart={cart}
     addToCart={addToCart}
     removeToCart={removeToCart}
    />  
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map(guitar =>
              <Guitar
                key={guitar.id}
                auth={true}
                guitar={guitar}
                addToCart={addToCart}
                />)
          }
        </div>
    </main>
    <Footer />
    </>
  )
}

export default App
