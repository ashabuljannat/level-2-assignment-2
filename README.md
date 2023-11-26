### Set up the Project

- Create a new project by Node.js ,Express ,ts ,Mongoose ,zod .
- Set up MongoDB database "test" and collection "users" using Mongoose.

### User Management:

### 1. Create a new user

- Endpoint: **POST /api/users**

- Request Body:

```json
{
  "userId": 1,
  "username": "jhon doe",
  "password": "38fn39egbcmke0rhck",
  "fullName": {
    "firstName": "Jhon",
    "lastName": "doe"
  },
  "age": 40,
  "email": "jhondoe@gmail.com",
  "isActive": "active",
  "hobbies": ["study", "tour"],
  "address": {
    "street": "bonani",
    "city": "dhaka",
    "country": "bangladesh"
  },
  "orders": [
    {
      "productName": "pc",
      "price": 500,
      "quantity": 2
    },
    {
      "productName": "camera",
      "price": 300,
      "quantity": 5
    }
  ]
}
```

- Response: created user object data. with no password field

```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    },
    "orders": [
      {
        "productName": "Product 1",
        "price": 23.56,
        "quantity": 2
      },
      {
        "productName": "Product 2",
        "price": 23.56,
        "quantity": 5
      }
    ]
  }
}
```

- Response: if userId exist then show error

```
 throw new Error('User already exists!');
```

### Instruction ![#00b48a](https://via.placeholder.com/20/00b48a?text=+)

- for hiding password field i use `select: false` in user model
- also use destructure for get necessary data

### 2. Retrieve a list of all users

- Endpoint: **GET /api/users**
- Response: List of users objects. Each object only contain `username`, `fullName`, `age`, `email`, `address`

```json
{
  "success": true,
  "message": "Users fetched successfully!",
  "data": [
    {
      "username": "string",
      "fullName": {
        "firstName": "string",
        "lastName": "string"
      },
      "age": "number",
      "email": "string",
      "address": {
        "street": "string",
        "city": "string",
        "country": "string"
      }
    }
  ]
}
```

### Instruction ![#00b48a](https://via.placeholder.com/20/00b48a?text=+)

- for hiding password field i use `find().select('-password');` in find query
- also use destructure for get necessary data

### 3. Retrieve a specific user by ID

- Endpoint: **GET /api/users/:userId**

- Response: data of specific user objects.User object and the password field is not included in the response data.

```json
{
  "success": true,
  "message": "User fetched successfully!",
  "data": {
    "userId": "number",
    "username": "string",
    "fullName": {
      "firstName": "string",
      "lastName": "string"
    },
    "age": "number",
    "email": "string",
    "isActive": "boolean",
    "hobbies": ["string", "string"],
    "address": {
      "street": "string",
      "city": "string",
      "country": "string"
    },
    "orders": [
      {
        "productName": "Product 1",
        "price": 23.56,
        "quantity": 2
      },
      {
        "productName": "Product 2",
        "price": 23.56,
        "quantity": 5
      }
    ]
  }
}
```

- Response: if userId not exist then show error

```
 throw new Error('User not found!');
```

```json
{
  "success": false,
  "message": "User id ${userId} not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

### 4. Update user information

- Endpoint: **PUT /api/users/:userId**

- Request Body: Updated user data (similar structure as in user creation).

- Response: if data updated

```json
{
  "success": true,
  "message": "User id ${userId} updated successfully!",
  "data": {
    "modifiedCount": 1
  }
}
```

- Response: if data not to be updated

```json
{
  "success": false,
  "message": "you enter same data to User id ${userId}",
  "data": {
    "modifiedCount": 0
  }
}
```

- Response: if user not exist

```json
{
  "success": false,
  "message": "User id ${userId} not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

### 5. Delete a user

- Endpoint: **DELETE /api/users/:userId**

- Response: if user exixt

```json
{
  "success": true,
  "message": "User id 10 deleted successfully!",
  "data": { "deletedCount": 1 }
}
```

- Response: if user not exixt

```json
{
  "success": false,
  "message": "User id ${userId} not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

### Order Management:

### 1. Add New Product in Order

- Endpoint: **PUT /api/users/:userId/orders**

- Request Body:

```json
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
```

- Response:

```json
{
  "success": true,
  "message": "Order created successfully for User id ${userId} ",
  "data": {
    "modifiedCount": 1
  }
}
```

- Response: if user not exixt

```json
{
  "success": false,
  "message": "User id ${userId} not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

### 2. Retrieve all orders for a specific user

- Endpoint: **GET /api/users/:userId/orders**

- Response:

```json
{
  "success": true,
  "message": "Orders of User id 23 fetched successfully!",
  "data": {
    "_id": "6561d6ebd736390c2258da63",
    "orders": [
      {
        "productName": "shirt",
        "price": 150,
        "quantity": 2,
        "_id": "6562124d9105538477b5a42e"
      }
    ]
  }
}
```

- Response: if user not exixt

```json
{
  "success": false,
  "message": "User id ${userId} not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

### 3. **Calculate Total Price of Orders for a Specific User**

- Endpoint: **GET /api/users/:userId/orders/total-price**

- Response:

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": {
    "totalPrice": 454.32
  }
}
```

- Response: if user not exixt

```json
{
  "success": false,
  "message": "User id ${userId} not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```
## Validation with Zod

- Using zod to validate incoming data for user and order creation and updating operations.
- Consider using linting tools ( ESLint, prettier ) to enforce coding style and identify potential issues. 
- there are 10+ commits in your GitHub repository. in more branch.

## **Submission:**

- Share the GitHub repository link and the live deployment link as part of your        submission.
- Include a README file with clear instructions on how to run the application locally.

## Instruction form me

  1. **run this program:**
  - run `tsc` for compile the code to js
  - run `npm run start:nodemon` for start code in node server
  - run `npm run lint` for catch eslint error
  - run `npm run prettier` for code formatter