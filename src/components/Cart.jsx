import { useMemo } from "react";

const Cart = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }) => {
  /**
   * useMemo, memoriza el resultado de una función para evitar cálculos costosos en cada renderizado. 
   * Solo vuelve a calcular el resultado cuando alguna de las dependencias (en este caso, cart) cambia. 
   * Es útil para optimizar el rendimiento.
   */
  const isEmpty = useMemo(()=>cart.length===0, [cart])
  const cartTotal = useMemo(()=>cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]); 

  return (
    <div className="carrito">
      <img
        className="img-fluid"
        src="/img/carrito.png"
        alt="imagen carrito"
      />

      <div id="carrito" className="bg-white p-3">
        {isEmpty ? (
          <p className="text-center">El carrito esta vacio</p>
        ) : (
          <>
            <table className="w-100 table">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((guitar) => (
                  <tr key={guitar.id}>
                    <td>
                      <img
                        className="img-fluid"
                        src={`/img/${guitar.image}.jpg`}
                        alt="imagen guitarra"
                      />
                    </td>
                    <td>{guitar.name}</td>
                    <td className="fw-bold">{guitar.price}</td>
                    <td className="flex align-items-start gap-4">
                      <button onClick={()=>decreaseQuantity(guitar.id)} type="button" className="btn btn-dark">
                        -
                      </button>
                      {guitar.quantity}
                      <button onClick={()=>increaseQuantity(guitar.id)} type="button" className="btn btn-dark">
                        +
                      </button>
                    </td>
                    <td>
                      <button onClick={()=>removeFromCart(guitar.id)} className="btn btn-danger" type="button">
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-end">
              Total pagar: <span className="fw-bold">${cartTotal}</span>
            </p>
          </>
        )}

        <button onClick={clearCart} className="btn btn-dark w-100 mt-3 p-2">
          Vaciar Carrito
        </button>
      </div>
    </div>
  );
};

export { Cart };
