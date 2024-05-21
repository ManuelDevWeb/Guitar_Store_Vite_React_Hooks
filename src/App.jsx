import { useEffect, useState } from "react";

// Files
import { db } from "./data/db";

// Components
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";

function App() {
  const initialCart=()=>{
    const localStorageCart=localStorage.getItem('cart');
    // Si el localStorage tiene algo retornamos el array, sino devolvemos vacio
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  // States
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS=5;
  const MIN_ITEMS=1;

  const addToCart=(item)=>{
    const itemExist=cart.find((guitar)=>guitar.id===item.id);
    
    if(itemExist){
      const newCart=cart.map((item)=>{
        if(item.id===itemExist.id){
          item.quantity++;
        }
        return item;
      })
      setCart(newCart);
    }else{
      item.quantity=1;
      setCart([...cart, item])
    }
  }

  const removeFromCart=(id)=>{
    setCart(prevState => prevState.filter(guitar=>guitar.id!==id));
    //const newCart=cart.filter((item)=>item.id!==id);
    //setCart(newCart);
  }

  const increaseQuantity=(id)=>{
    const newCart=cart.map((item)=>{
      if(item.id===id && item.quantity<MAX_ITEMS){
        return {
          ...item,
          quantity: item.quantity+1
        }
      }
      return item;
    });

    setCart(newCart);
  }

  const decreaseQuantity=(id)=>{
    setCart(prevState=>
      prevState.reduce((currentCart, item)=>{
        if(item.id===id){
          if(item.quantity===MIN_ITEMS){
            return currentCart;
          }
          return [...currentCart, {...item, quantity: item.quantity-1}]
        }
        return [...currentCart, item]
      },[])
    );
  }

  const clearCart=()=>{
    setCart([])
  }

  useEffect(() => {
    // Local Storage
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  return (
    <>
      <Header 
        cart={cart}
        removeFromCart={removeFromCart} 
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              addToCart={addToCart}                          
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
