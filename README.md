# Playwright Automation Testing Project

### Overview 

This project brings together a set of technical test cases designed to validate non-trivial and edge-case scenarios, adding complexity to demonstrate strong problem-solving skills in test automation. It showcases a complete automation testing framework built with Playwright, following the Page Object Model (POM) architecture.
The project includes both **UI and API testing**.

<ins>UI Testing</ins>, focused on end-user functional validation, ensuring critical user flows behave as expected. <ins>API Testing</ins> Covers scenarios <ins>***with and without authorization tokens***</ins>, analyzing response times, system stability, and overall behavior under different conditions.

Additionally, the project considers high-demand scenarios (such as Black Friday events), evaluating the system’s ability to maintain performance under load and enabling early detection.

 _The approach goes beyond simply executing tests, it emphasizes critical thinking: defining what to validate, how to validate it, and which metrics to monitor in order to ensure product quality in real world scenarios._ 
  

### Page Object Model (POM)
> The project follows the Page Object Model design pattern to improve:
> Maintainability- Readability- Scalability and Reusable components.
> **Each page contains its locators and actions, separating logic from tests.**


### Continuous Integration

This project uses GitHub Actions to automatically run tests on every push and pull request.

CI/CD includes:

install dependencies
install browsers
run tests
generate HTML report
upload artifacts
publish report

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

Running Tests Locally

Install dependencies:

npm install

Run tests:

npx playwright test

Open HTML report:

npx playwright show-report




## Test Reports

After each execution, Playwright generates an HTML report.
The report includes:
- passed tests    - failed tests  - screenshots  - traces  - execution time - logs

GitHub Actions

Tests run automatically on:

push to main - push to master - pull requests

Report is available in GitHub Actions artifacts.


Project Structure
Playwright/
│
├── pages/
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── Cart.ts
│   ├── ContactPage.ts
│
├── tests/
│   ├── UI/
│   │   └── PruebasUI.spec.ts
│   │
│   ├── E2E/
│   │   └── CompraExitosa.spec.ts
│   │
│   ├── API/
│
├── Fixtures/
│   └── ForE2EFlow.json
│
├── playwright.config.ts
├── package.json
├── README.md
├── .github/workflows/playwright.yml


## Test Coverage 

UI Testing
Login validation
Navigation
Page elements
User interactions
End-to-End Testing
Complete purchase flow
Product selection
Cart validation
Checkout process
API Testing
Product endpoints
Data validation
Status code verification
Response structure validation



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




Goal

This project is part of my professional portfolio to demonstrate automation testing skills and continuous learning in QA engineering. 

