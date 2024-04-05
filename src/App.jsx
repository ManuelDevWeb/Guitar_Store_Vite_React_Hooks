import { useEffect, useState } from "react";

// Files
import { db } from "./data/db";

// Components
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";

function App() {
  // States
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(db);
  }, []);

  return (
    <>
      <Header />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map(guitar => <Guitar key={guitar.id} name={guitar.name} description={guitar.description} image={guitar.image} price={guitar.price} />)}
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
