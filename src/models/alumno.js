export default class Alumno {
  
constructor(nombre, DNI, edad) {
  this.nombre = nombre;
  this.DNI = DNI;
  this.edad = edad;
}

}

const alumnosArray = [];

alumnosArray.push(new Alumno("Esteban Dido"  , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao"    , "32623391", 18));

export { alumnosArray };