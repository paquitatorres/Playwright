export class PriceHelper {


static validarOrdenAscendente(precios: number[]): void {


 for (let i = 0; i < precios.length - 1; i++) 
      
 {
     const actual = precios[i];
     const siguiente = precios[i + 1];
     console.log(`Comparando: ${actual} con ${siguiente}`);

     if (actual > siguiente) {
       throw new Error
    (
       `Error de ordenamiento en posición ${i}.
        Se comparó ${actual} con ${siguiente}
        y ${actual} es mayor que ${siguiente}`
    );
 }  
 }
 
console.log('Los precios están ordenados de menor a mayor:', precios);

}


}

//OTRA FORMA DE VALIDAR QUE ESTA ordenado, pero si falla se detiene ahi el test 
// //    expect(actual).toBeLessThanOrEqual(siguiente); 