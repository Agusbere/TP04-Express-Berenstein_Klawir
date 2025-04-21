import express from "express";
import cors from "cors";
import { sumar, restar, multiplicar, dividir } from "./modules/matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./modules/omdb-wrapper.js";

const app = express();

const port = 3000; // El puerto 3000 (http://localhost:3000)

app.use(cors());
app.use(express.json());

// EndPoint "/"
app.get("/", (req, res) => {
  res.send("Ya estoy respondiendo!");
});

// EndPoint "/saludar"
app.get("/saludar/:nombre", (req, res) => {
  res.send("Hola " + req.params.nombre);
});

app.get("/validarfecha/:ano/:mes/:dia", (req, res) => {
  const { ano, mes, dia } = req.params;

  const year = parseInt(ano);
  const month = parseInt(mes);
  const day = parseInt(dia);

  const fecha = Date.parse(year, month, day);

  if (!isNaN(fecha) && validarNumeros(year, month, day) === true) {
    res.status(200).send("Fecha válida");
  } else {
    res.status(400).send("Fecha inválida");
  }
});

function validarNumeros(year, month, day) {
  const meses = 12;
  const maxDias = 31;
  const CERO = 0;
  if (
    month <= meses &&
    day <= maxDias &&
    month > CERO &&
    day > CERO &&
    year > CERO
  )
    return true;
  else return false;
}

app.get("/matematica/sumar", (req, res) => {
  const { n1, n2 } = req.query;

  const num1 = parseInt(n1);
  const num2 = parseInt(n2);

  const resultado = sumar(num1, num2);
  res.status(200).send(resultado);
});

app.get("/matematica/restar", (req, res) => {
  const { n1, n2 } = req.query;

  const num1 = parseInt(n1);
  const num2 = parseInt(n2);

  const resultado = restar(num1, num2);
  res.status(200).send(resultado);
});

app.get("/matematica/multiplicar", (req, res) => {
  const { n1, n2 } = req.query;

  const num1 = parseInt(n1);
  const num2 = parseInt(n2);

  const resultado = multiplicar(num1, num2);
  res.status(200).send(resultado);
});

app.get("/matematica/dividir", (req, res) => {
  const { n1, n2 } = req.query;

  const num1 = parseInt(n1);
  const num2 = parseInt(n2);
  if (num1 === 0) res.status(400).send("Numero 1 no puede ser 0");
  else {
    const resultado = dividir(num1, num2);
    res.status(200).send(resultado.toFixed(2));
  }
});

app.get("/omdb/searchbypage", async (req, res) => {
  const { search, p } = req.query;

  if (!search || !p || isNaN(p)) {
    return res.status(400).json({
      respuesta: false,
      mensaje: "Parámetros inválidos. Debés enviar 'search' y 'p' (número).",
      datos: [],
    });
  }

  try {
    let resultado = await OMDBSearchByPage(search, parseInt(p));

    return res.status(200).json({
      respuesta: resultado.respuesta,
      datos: resultado.respuesta ? resultado.datos : [], 
    });
  } catch (error) {
    console.error("Error en /omdb/searchbypage:", error);
    return res.status(500).json({
      respuesta: false,
      mensaje: "Error interno del servidor",
      datos: [],
    });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
