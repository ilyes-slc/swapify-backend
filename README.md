# Swapify Backend - Express.js and MongoDB

## General Overview

Welcome to Swapify Backend! This Express.js and MongoDB-based server complements the Swapify frontend, providing essential functionalities for user authentication, authorization, and product management. The backend utilizes JSON Web Tokens (JWT) for secure user authentication, various middleware for role-based access control, and Multer for handling image uploads.

### JWT Authentication Mechanism

JWT is used to ensure secure communication between the frontend and backend. The mechanism involves generating tokens upon successful user login, verifying these tokens on protected routes, and implementing token expiry and refresh mechanisms for enhanced security.

### Middlewares

Two sets of middlewares are employed in this project:

#### Auth Middleware (`authJwt`)

- `verifyToken`: Verifies the JWT token provided in the request headers.
- `isAdmin`: Ensures the user has an "admin" role.
- `isModerator`: Ensures the user has a "moderator" role.

#### Verification Middleware (`verifySignUp`)

- `checkDuplicateUsernameOrEmail`: Checks if the provided username or email is already in use.
- `checkRolesExisted`: Validates that the specified user roles exist.

### Image Upload with Multer

Multer is used for handling image uploads in the `product.routes.js` file. Images are stored in the 'images/' directory with unique filenames.

```javascript
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: 'images/',
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});

const upload = multer({ storage: storage });

module.exports = function(app) {
    // ... Other middleware
    app.post("/api/products", upload.single('image'), controller.saveProduct);
    // ... Other routes
}
```
## Installation and Running the Project

Follow these steps to set up and run the Swapify Backend:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/ilyes-slc/swapify-backend.git
    ```

2. **Navigate to Project Directory:**
    ```bash
    cd swapify-backend
    ```

3. **Install Dependencies:**
    ```bash
    npm install
    ```

4. **Configure MongoDB with Atlas:**
    - Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
    - Set up the connection string in `server.js`:
      ```javascript
      db.mongoose
        .connect(`mongodb+srv://<username>:<password>@cluster0.kpmwvnr.mongodb.net/?retryWrites=true&w=majority`, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
          console.log("Successfully connect to MongoDB.");
          initial();
        })
        .catch(err => {
          console.error("Connection error", err);
          process.exit();
        });
      ```

5. **Run the Application:**
    ```bash
    node server.js
    ```

Now, the Swapify Backend is up and running!

## Remarks

Feel free to contribute, report issues, or suggest improvements. Your feedback is valuable in enhancing the functionality and security of Swapify. Happy coding! 🚀
