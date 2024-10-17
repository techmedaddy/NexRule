# NexRule: AST-based dynamic rule evaluation engine

## Introduction:
NexRule is a rule evaluation engine that allows users to create, combine, and evaluate rules against user data. It uses an Abstract Syntax Tree (AST) to parse and evaluate rules dynamically.

![WhatsApp Image 2024-10-17 at 22 01 42_9b531910](https://github.com/user-attachments/assets/e51cc340-9d2d-4479-a265-083320681a56)






## Features

### 1. Rule Creation
- Users can create rules using a simple string format.
- The format allows for flexibility and ease of understanding, e.g., `"age > 18"` or `"status == 'active'"`.

### 2. Combining Rules
- Users can combine multiple rules using logical operators.
- Supported operators: `AND`, `OR`.
- Example: `"age > 18 AND status == 'active'"`.

### 3. Rule Evaluation
- The system evaluates rules against user data to determine if they are satisfied.
- Data is passed in as key-value pairs, e.g., `{ "age": 25, "status": "active" }`.
- Rules are checked based on the logical conditions provided.


## Technologies Used

### 1. Node.js
- Server-side JavaScript runtime for building scalable network applications.

### 2. Express
- Web framework for Node.js to handle HTTP requests and manage routing efficiently.

### 3. MongoDB
- NoSQL database used for storing rules and Abstract Syntax Trees (ASTs) for rule evaluations.

### 4. Docker
- Containerization tool for easy deployment, ensuring consistency across different environments and simplifying application management.

## Design Choices

### Technology Stack

**Node.js and Express**: 
- **Reasoning**: Node.js provides a non-blocking architecture, ideal for handling multiple concurrent requests, which is essential for a rule evaluation engine. Express simplifies API development and routing, enabling quick and efficient handling of HTTP requests.

**MongoDB**: 
- **Reasoning**: As a NoSQL database, MongoDB offers flexibility in storing rule definitions and user data. Its document-oriented structure aligns well with the dynamic nature of the rule evaluation system, allowing for easy modification and retrieval of rules.

**Docker**: 
- **Reasoning**: Docker ensures a consistent development environment across different machines. It simplifies deployment by encapsulating the application and its dependencies within containers, making it easy to scale and manage.

### Architecture

**Modular Structure**: 
- **Design Choice**: The application is structured into separate modules for configuration, controllers, models, and routes. This separation of concerns enhances maintainability and allows for easier testing and debugging.

**Abstract Syntax Tree (AST)**: 
- **Design Choice**: Leveraging an AST for rule definitions enables flexible parsing and evaluation of complex rules. This design allows for dynamic rule creation and modifications without requiring changes to the underlying evaluation logic.

### Rule Evaluation Logic

**Dynamic Rule Creation**: 
- **Design Choice**: Users can define rules in a string format, such as `"age > 18"` or `"status == 'active'"`. This approach makes the system intuitive and user-friendly, enabling non-technical users to interact with the rule engine.

**Combining Rules**: 
- **Design Choice**: The ability to combine rules using logical operators (AND, OR) allows for complex evaluations, such as `"age > 18 AND status == 'active'"`. This enhances the system's flexibility and power, enabling more sophisticated data evaluations.


  ## Dependencies to Download

### Backend Dependencies
- **express**: Web framework for building APIs and handling routing.
- **mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js, used for interacting with the MongoDB database.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`, allowing you to manage sensitive information like API keys.
- **body-parser**: Middleware to parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.
- **jsonwebtoken**: Library to work with JSON Web Tokens for authentication (if needed).
- **ws**: WebSocket library for real-time communication (if applicable).

### Development Dependencies
- **jest**: A delightful JavaScript testing framework with a focus on simplicity, used for writing and running unit tests.
- **nodemon**: A utility that automatically restarts the Node.js server when file changes are detected during development.
- **supertest**: A library for testing HTTP requests in Node.js applications, useful for writing tests for your Express routes.

### Installing Dependencies
Run the following command in the project root to install all dependencies:
```bash
npm install
```



### Testing Strategy

**Unit Testing with Jest**: 
- **Design Choice**: Implementing unit tests using Jest ensures that individual components of the application function correctly. This choice helps catch bugs early in the development process and supports code reliability.

---



## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repository.git
```

### 2. Install Docker if you haven't already.

### 3. Build and run the Docker containers:
```bash
docker-compose up --build
```

### 4. Access the application at 
```bash
http://localhost:3000
```

## Configuration

Environment Variables: Use a .env file in the root directory to set configuration values such as MongoDB URI and the application port.
```bash
PORT=3000
MONGODB_URI=mongodb://mongo:27017/nexrule
```

## API Endpoints
### Create Rule

## POST /api/rule

**Description:**  Creates a new rule and returns the corresponding Abstract Syntax Tree (AST).

### Request Body:


#### Example:
```json
{
  "rule": "age > 18 AND status == 'active'"
}
```

### Response:

### 201 Created:

```json
{
  "ast": { /* AST representation of the rule */ }
}

```
### 400 Bad Request:

```json
{
  "error": "Rule string is required."
}

```

## Combine Rules
 ## POST  /api/combineRules

**Description:**  
Combines multiple rules into a single Abstract Syntax Tree (AST) using logical operators.
### Request Body:
```json
{
  "rules": [
    "age > 30",
    "salary < 50000"
  ]
}

```

### Response:

### 200 OK:

```json
{
  "combinedAST": { /* Combined AST */ }
}

```


## Evaluate Rule
## POST        /api/evaluateRule

**Description:**  
Evaluates a rule AST against user data.
### Request Body:
```json
{
  "ast": { /* AST representation */ },
  "userData": {
    "age": 35,
    "salary": 45000
  }
}


```

### Response:

### 200 OK:

```json
{
  "result": true
}

```

## Error Handling

When using the NexRule API, you may encounter various errors. Below are some common errors and their meanings:

### 400 Bad Request
**Description:** The request could not be understood by the server due to malformed syntax.  
**Example:** 
```json
{
  "error": "Rule string is required."
}
```
Possible Causes:
### 1. Missing required fields in the request body.
### 2. Incorrectly formatted rules.

## 404 Not Found
**Description:** The requested resource could not be found on the server.
Example:
```json
{
  "error": "Resource not found."
}

```
Possible Causes:
### 1. Missing required fields in the request body.
### 2. Incorrectly formatted rules.

## 500 Internal Server Error
**Description:** The server encountered an unexpected condition that prevented it from fulfilling the request.
Example:
```json
{
  "error": "An unexpected error occurred."
}
```
Possible Causes:
### 1. Issues with the server code.
### 2. Database connection errors.


## 401 Unauthorized
**Description:** The request requires user authentication.
Example:
```json
{
  "error": "Authentication required."
}

```
Possible Causes: Missing or invalid authentication token in the request headers.



## Project Structure
```bash
NexRule/
├── src/                        # Main source code directory
│   ├── config/                 # Configuration files
│   │   └── db.js               # Database connection and configuration settings
│   ├── controllers/            # Controllers handle incoming requests and responses
│   │   ├── ruleController.js    # Defines API endpoints for rule management
│   ├── models/                 # Database models (schema definitions)
│   │   └── ruleModel.js        # Defines the structure of rules in the database
│   ├── services/               # Business logic and service layer
│   │   └── ruleService.js      # Contains logic for creating, combining, and evaluating rules
│   ├── routes/                 # Route definitions for the application
│   │   └── ruleRoutes.js       # Sets up API routes for rule-related operations
│   ├── utils/                  # Utility functions and helpers
│   │   └── astParser.js        # Handles parsing, combining, and evaluating ASTs (Abstract Syntax Trees)
│   └── server.js               # Main entry point for the application, sets up the server
├── public/                     # Static assets served to the client
│   ├── css/                    # Stylesheets
│   │   └── styles.css          # Main CSS file for styling the front end
│   ├── js/                     # JavaScript files for the client-side
│   │   └── script.js           # Main JavaScript file for client-side interactions
│   └── index.html              # Main HTML file that serves as the entry point for the web app
├── tests/                      # Test files for unit and integration tests
│   └── rule.test.js            # Contains tests for rule-related functionalities
├── .env                        # Environment variables for configuration (ignored by Git)
├── .gitignore                  # Specifies files and directories to ignore in Git
├── Dockerfile                  # Dockerfile to build the application container
├── docker-compose.yml          # Configuration file for running multiple services using Docker Compose
├── package.json                # Lists dependencies and scripts for the Node.js application
└── node_modules                # Directory where project dependencies are installed (ignored by Git)


```


## Usage Examples

Once the NexRule application is running, you can interact with the API using tools like Postman or CURL. Here are some practical examples of how to use the application:

### 1. Create a Rule
**Endpoint:** `POST /api/rule`  
**Description:** Create a new rule and receive its Abstract Syntax Tree (AST).

**Request:**
```bash
curl -X POST http://localhost:3000/api/rule \
-H "Content-Type: application/json" \
-d '{"rule": "age > 18 AND status == \"active\""}'
```

### Response:
```json
{
  "ast": { /* AST representation of the rule */ }
}
```









### 2. Combine Rules
**Endpoint:** `POST /api/combineRules`  
**Description:** Combine multiple rules into a single Abstract Syntax Tree (AST).

**Request:**
```bash
curl -X POST http://localhost:3000/api/combineRules \
-H "Content-Type: application/json" \
-d '{"rules": ["age > 30", "salary < 50000"]}'

```

### Response:
```json
{
  "combinedAST": { /* Combined AST */ }
}
```












### 3. Evaluate a Rule
**Endpoint:** `POST /api/evaluateRule`  
**Description:**  Evaluate a rule AST against user data.

**Request:**
```bash
curl -X POST http://localhost:3000/api/evaluateRule \
-H "Content-Type: application/json" \
-d '{
  "ast": { /* AST representation */ },
  "userData": {
    "age": 35,
    "salary": 45000
  }
}'
```





### Response:
```json
{
  "result": true
}
```























## Conclusion
Thank you for exploring the NexRule project! This application demonstrates my ability to create a dynamic rule evaluation engine using various technologies. I welcome any feedback or questions regarding the implementation and design choices.

