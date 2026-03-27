![Playwright](https://img.shields.io/badge/Playwright-Test%20Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Language-blue)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![CI/CD](https://img.shields.io/badge/GitHub%20Actions-CI%2FCD-orange)
![Status](https://img.shields.io/badge/tests-passing-brightgreen)


# Playwright Automation Testing Project

## Overview 

This project brings together a set of technical test cases designed to validate non-trivial and edge-case scenarios, adding complexity to demonstrate strong problem-solving skills in test automation. It showcases a complete automation testing framework built with Playwright, following the Page Object Model (POM) architecture.
The project includes both **UI and API testing**.

<ins>UI Testing</ins>, focused on end-user functional validation, ensuring critical user flows behave as expected. <ins>API Testing</ins> Covers scenarios <ins>***with and without authorization tokens***</ins>, analyzing response times, system stability, and overall behavior under different conditions.

Additionally, the project considers high-demand scenarios (such as Black Friday events), evaluating the system’s ability to maintain performance under load and enabling early detection.

 _The approach goes beyond simply executing tests, it emphasizes critical thinking: defining what to validate, how to validate it, and which metrics to monitor in order to ensure product quality in real world scenarios._ 




### Tech Stack 

 Playwright | TypeScript | Node.js | GitHub Actions | Ubuntu |
|     :---:      |     :---:      |     :---:      |     :---:      |       :---:      |
| <img width="75" height="75" alt="playwright" src="https://github.com/user-attachments/assets/030573e5-2bb9-46df-956b-86f50add4917" />| 	<img width="75" height="75" alt="typeScript" src="https://github.com/user-attachments/assets/912db761-0ecb-46e1-a393-7a2cfbd52152" />| <img width="75" height="75" alt="node.js" src="https://github.com/user-attachments/assets/8e7dbe5f-d4d9-4b0d-8826-f7e699a371e5" />|<img width="75" height="75" alt="github actions" src="https://github.com/user-attachments/assets/5633cd6e-0549-42cb-b56a-a38c90a3ecb3" />|<img width="75" height="75" alt="ubuntu" src="https://github.com/user-attachments/assets/2f73dde0-39fa-4351-abbf-6c1db0f35e4b" />|
 

### Features
- Data-driven testing (JSON / Excel) for dynamic scenarios
- UI Test Automation with Playwright using Page Object Model (POM)
- API Testing with and without authentication (token-based)
- End-to-End (E2E) testing covering critical user flows (purchase flow)
- Advanced error handling with controlled failures and evidence capture
- HTML reporting for test results visualization
- Performance validation (response time assertions)
- Concurrency testing (parallel requests simulation)
- CI/CD integration with GitHub Actions


### Page Object Model (POM)
> The project follows the Page Object Model design pattern to improve:
> Maintainability- Readability- Scalability and Reusable components.
> **Each page contains its locators and actions, separating logic from tests.**



### Continuous Integration

> This project uses GitHub Actions to automatically run tests on every push and pull request. This project uses GitHub Actions to ensure code quality and stability CI/CD includes:
> Install dependencies - Install browsers - Run tests - Generate HTML report - Upload artifacts - Publish report
> Workflow file: .github/workflows/playwright.yml

### Test Reports

> After each execution, Playwright generates an HTML report.
> The report includes: - Passed tests    - Failed tests ( with Screenshots)  - Execution time 

### GitHub Actions

> Tests run automatically on: `push to main`    `push to master`   `pull requests`
> Report is available in GitHub Actions artifacts.




### Running Tests Locally

To execute the tests on your local environment:

1. Install dependencies:
   `npm install`

2. Run all tests:
   `npx playwright test`

   Run tests in headed mode:
   `npx playwright test --headed`

3. Open the HTML report:
   `npx playwright show-report`





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



## Test Report Preview

![HTML Report](./reports/report-preview.png)

## Example: No Results Found (Error Handling)

![No Results](./screenshots/no-results.png)

## Test Reports

After running the tests, a detailed HTML report is generated automatically.

To open the report locally:
npx playwright show-report

## Live Test Reports (GitHub Pages)

You can view the latest test execution report here:

👉 https://TU_USUARIO.github.io/TU_REPO/




Goal

This project is part of my professional portfolio to demonstrate automation testing skills and continuous learning in QA engineering. 

