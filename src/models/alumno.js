export default class Alumno {
    constructor(nombre, DNI, edad) {
      this.nombre = nombre;
      this.DNI = DNI;
      this.edad = edad;
    }
  
    Informacion() {
      return `nombre:${this.nombre}, DNI:${this.DNI}, edad:${this.edad}`;
    }
  }