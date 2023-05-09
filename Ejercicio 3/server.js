import express from "express";

const libros = [
    { id: 1, nombre: "Harry Potter 1", precio: 10000, stock: 25 },
    { id: 2, nombre: "Los juegos del Hambre", precio: 8500, stock: 50 },
    { id: 3, nombre: "Correr o Morir", precio: 9000, stock: 7 },
  ];
  
  const app = express();
  app.use(express.static("public")); // Permite usar el front end de la carpeta public.
  app.use(express.json()); // Sirve para que funcione el req.body() en el metodo POST con body en JSON.
  

  // --------------------- GET ----------------------
  app.get("/api/libros/:id?", (req, res) => {
    const { id } = req.params;
  
    if (id) {
      const libro = libros.find((libro) => libro.id == id);
      res.json(libro || {});
    } else {
      res.json(libros);
    }
  });
  
  // -------------------- POST ----------------------
  app.post("/api/libros", (req, res) => {
    const libro = req.body;
    libro.id = (libros[libros.length - 1]?.id || 0) + 1;
    
    libros.push(libro);
    res.json(libro);
    //res.redirect("/");
  });
  

  // ------- PUT (actualizacion total/parcial) ------
  app.put("/api/libros/:id", (req, res) => {
    const id = Number(req.params.id);
    const libro = req.body;
    libro.id = id;
  
    const indice = libros.findIndex(libro => libro.id === id);
    if (indice != -1){

      const libroAnterior = libros[indice];
      const libroNuevo = { ...libroAnterior, ...libro };
      libros.splice(indice, 1, libroNuevo);
      res.json(libroNuevo);
    } else{
        throw Error(`Error: no se encontró un libro con ese id.`)
    }
  });
  
  // -------------------- DELETE --------------------
  app.delete("/api/libros/:id", (req, res) => {
    const { id } = req.params;
    const indice = libros.findIndex(libro => libro.id == id);
    let libro;
    if (indice != -1){
        libro = libros.splice(indice, 1)[0];
    } 
    
    res.json(libro);
  });
  
  const PORT = 8080;
  const server = app.listen(PORT, () =>
    console.log(`Servidor HTTP express escuchando en http://localhost:${PORT}`)
  );
  
  server.on("error", (error) =>
    console.log(`Error en servidor: ${error.message}`)
  );
  