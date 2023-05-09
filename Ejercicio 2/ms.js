import fs from "fs";

function leerPackage() {
  try {
    let datos = fs.readFileSync("package.json", "utf-8");
    let info = {
      contenidoStr: datos,
      contenidoObj: JSON.parse(datos),
      size: Buffer.byteLength(datos),
    };
    console.log(info);

    fs.writeFileSync("info", JSON.stringify(info, null, "\t"));
  } catch (error) {
    console.log(
      `Error en la operación asincrónica de escritura/lectura: ${error.message}`
    );
  }
}

leerPackage();