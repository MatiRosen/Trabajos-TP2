import express from "express";

const libros = [
  {
    id: 1,
    titulo: "Harry Potter y la Piedra Filosofal",
    autor: "J.K. Rowling",
    año: 1997,
  },
  {
    id: 2,
    titulo: "Los juegos del Hambre",
    autor: "Suzanne Collins",
    año: 2008,
  },
  { id: 3, titulo: "Correr o Morir", autor: "James Dashner", año: 2009 },
];

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
});

// -------------------- PUT -----------------------
app.put("/api/libros/:id", (req, res) => {
  const id = Number(req.params.id);
  const libro = req.body;
  libro.id = id;

  const indice = libros.findIndex((libro) => libro.id === id);
  if (indice != -1) {
    const libroAnterior = libros[indice];
    const libroNuevo = { ...libroAnterior, ...libro };
    libros.splice(indice, 1, libroNuevo);
    res.json(libroNuevo);
  } else {
    res.json({
      error: "Error: no se encontró un libro con ese id.",
    });
  }
});

// -------------------- DELETE --------------------
app.delete("/api/libros/:id", (req, res) => {
  const { id } = req.params;
  const indice = libros.findIndex((libro) => libro.id == id);
  let libro;
  if (indice != -1) {
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
