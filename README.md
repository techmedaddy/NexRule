# NexRule Project Documentation

## Introduction:
NexRule is a rule evaluation engine that allows users to create, combine, and evaluate rules against user data. It uses an Abstract Syntax Tree (AST) to parse and evaluate rules dynamically.

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
## POST        /api/combineRules

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


