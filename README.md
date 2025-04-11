# dataBase-exercise
MySQL database exercise along with nodeJs


# 📦 Database Exercise

This is a simple Node.js + MySQL project to practice creating and working with relational databases. The project includes a web form for adding product details and stores them in multiple related database tables.

## 🛠️ Features

- Create product-related tables using SQL
- Insert new product data through a web form
- Connect frontend (HTML form) with backend (Node.js)
- Save product information into multiple related tables

## 🧱 Tables Created

1. **Products** – Stores basic product name and URL  
2. **ProductDescription** – Stores detailed product info like description, image, and link  
3. **ProductPrice** – Stores price range and starting price  
4. **Orders** – (Structure added for future order processing)  
5. **Users** – (Structure added for future user handling)

## 📂 Project Structure


## 🧪 How to Use

1. **Install dependencies**:
   In your terminal, navigate to your project directory and run:
   ```bash
   npm install

2. **Start the server: Run the following command to start the backend server**:

node app.js
3. **Create tables: Open your browser and navigate to this URL to create the necessary database tables**:
http://localhost:5000/install
4. **Add product data: Visit the HTML form page to add product information:**

http://localhost:5000/add-product



**Details of Files**
app.js: Contains the backend logic using Express.js, handling requests and interacting with the MySQL database.

index.html: The HTML page where users can input product information.

css/style.css: Custom styles to improve the design of the form.

package.json: Manages project dependencies, scripts, and metadata.

package-lock.json: Ensures consistent versions of dependencies.


**Contributing**

Pull requests are welcome! For major changes, please open an issue first.

**Author**

Fuad Delil – Frontend Developer & Software Enthusiast

GitHub: @Fuad-Delil