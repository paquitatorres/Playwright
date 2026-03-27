# Playwright Automation Testing Project

### Overview 

Este proyecto reúne distintas pruebas técnicas y casos diseñados para validar escenarios poco comunes agregando un poco más de dificultad para demostrar la resolución de problemas complejos de automatización. 
This project showcases a complete automation testing framework built with Playwright using the Page Object Model (POM) architecture.
Incluye automatización de test de UI, enfocada en la validación funcional desde la perspectiva del usuario, y pruebas de API con y sin Tokens de autorización, orientadas a analizar tiempos de respuesta, estabilidad y comportamiento del sistema.
Además, se contemplan escenarios de alta demanda (eventos como Black Friday) donde se evalúa que no haya perdida de la capacidad del sistema para mantener su rendimiento, o poder crear alertas antes funcionamientos  .
El enfoque no está solo en ejecutar pruebas, sino en aplicar criterio: definir qué validar, cómo hacerlo y qué métricas observar para asegurar la calidad del producto en contextos reales.

### Technologies Used
- Playwright
- TypeScript
- Node.js
- GitHub Actions

### Knowlege 
Page Object Model (POM)
CI/CD
HTML Reports Creation 
API Testing - E2E Testing - UI Testing

## Test Reports

After each execution, Playwright generates an HTML report.
The report includes:
- passed tests    - failed tests  - screenshots  - traces  - execution time - logs



## Test Coverage 

### TEST 1 “BUSCAR PRODUCTOS (PASADOS POR JSON), SELECCIONAR EL SEGUNDO RESULTADO O INFORMAR ERROR CON MENSAJE DE QUE NO EXISTE SEGUNDO PRODUCTO”

Búsqueda Dinámica y Manejo de Índices: El candidato debe consumir un archivo (JSON o Excel) con los nombres de los productos. La lógica debe ser capaz de:

Buscar una clase de productos y hacer click específicamente en el **segundo resultado** de la lista/grid. 

En el caso de buscar un producto inexistente. El script debe detectar que el elemento no está presente, **capturar un error controlado** (sin que el test "explote") y tomar una **captura de pantalla (screenshot)** de la página de "No results found". 

### TEST 2 “VALICIÓN DE ORDENAMIENTO DE PRODUCTOS AL APLICAR UN FILTRO POR PRECIO DE MENOR A MAJOR”

Creación de listas o Arrays y Comparación de Datos Númericos:  El candidato debe aplicar un filtro de precio ascendente, recolectar los datos de precios de la pagina,  y compararlos para ver si están organizados en el orden correspondiente. 

### TEST 3 “HAPPY PATH: INICIAR SESION CON CREDENCIALES VALIDAS”

Autenticación y Persistencia de Sesión:

No basta con entrar; hay que demostrar que estamos dentro.

- **Flujo:** Realizar un login exitoso con credenciales válidas.
- **Aserción (Validación):**  validar la existencia de un elemento que solo un usuario logueado ve (ej: el botón de "Logout", el nombre del perfil o el token de sesión en el *Local Storage*).

### TEST 4 “CASOS NEGATIVOS DE INICIO DE SESIÓN”

### TEST 5 “SUBIR UN ARCHIVO A COMPROBANTES”

## TEST E2E

“REALIZACIÓN DE COMPRA DE UN PRODUCTO”

## API TEST

### TEST “CREAR UN CARRITO,OBTENIENDO RESPUESTA HTTP 200, MARQUE COMO ERROR SI DA OTRA RESPUESTA, O TIEMPO DE RESPUESTA MAJOR A 2000ms.”
