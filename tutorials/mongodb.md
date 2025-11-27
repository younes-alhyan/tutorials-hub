# 🗄️ MongoDB Tutorial

[<img src="../icons/mongodb.svg" width="250"/>](https://younes-alhyan.github.io/tutorials-hub/index.html?tutorial=mongodb)

**Learn MongoDB essentials, connecting locally/remotely, using schemas, CRUD operations, instance methods, indexing, and operators with Mongoose.** 🚀

## 📌 Table of Contents

1. [🏁 Introduction & Setup](#🏁-introduction--setup)
2. [🗄️ Database Structure & Concepts](#🗄️-database-structure--concepts)
3. [🏗️ Creating Databases](#🏗️-creating-databases)
4. [🔗 Connecting to MongoDB](#🔗-connecting-to-mongodb)
5. [📄 Schemas & Models](#📄-schemas--models)
6. [✏️ CRUD Operations](#✏️-crud-operations)
7. [🛠️ Document Instance Methods](#🛠️-document-instance-methods)
8. [⚡ Common Mongoose Operators](#⚡-common-mongoose-operators)
9. [📈 Indexing & Query Optimization](#📈-indexing--query-optimization)
10. [💡 NoSQL Concepts](#💡-nosql-concepts)
11. [🖥️ Basic mongosh Commands](#🖥️-basic-mongosh-commands)

## 🏁 Introduction & Setup

- **MongoDB** → NoSQL database storing JSON-like documents.
- Install locally: [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- Remote: Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Install **Mongoose** for Node.js:

```bash
npm install mongoose
```

## 🗄️ Database Structure & Concepts

- **Client** → Your app connecting to MongoDB
- **Database** → Container of collections
- **Collection** → Table-like structure holding documents
- **Document** → JSON-like object

**Example Document:**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "itachi",
  "email": "itachi@example.com",
  "age": 17,
  "skills": ["Node.js", "MongoDB"]
}
```

## 🏗️ Creating Databases

### Local Database

```bash
# Start MongoDB server locally
mongod --dbpath ./data/db

# Access js
mongo
use myLocalDB
```

- MongoDB listens on `mongodb://127.0.0.1:27017`
- Keep `mongod` running for Node.js connections

### Remote Database (MongoDB Atlas)

1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string (replace `<user>` and `<password>`):

```
mongodb+srv://<user>:<password>@cluster0.mongodb.net/myRemoteDB
```

3. Whitelist your IP

## 🔗 Connecting to MongoDB

**server.js**

```js
const mongoose = require("mongoose");

// Local DB
mongoose.connect("mongodb://127.0.0.1:27017/myLocalDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Remote DB (Atlas)
mongoose.connect(
  "mongodb+srv://<user>:<password>@cluster0.mongodb.net/myRemoteDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to MongoDB!"));
```

## 📄 Schemas & Models

**usersModel.js**

```js
const mongoose = require("mongoose");

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // required string
  email: { type: String, unique: true, required: true }, // unique & required string
  age: Number, // optional number
  skills: [String], // optional array of strings
});

// Model name "User" → collection "users"
const User = mongoose.model("User", userSchema);
module.exports = User;
```

- **Schema** → Defines structure, types, validation
- **Model** → Interface to interact with the collection
- Schema applies **only to new documents or updates**, not existing ones
- **Model vs Collection Naming**

  - Mongoose pluralizes and lowercases the model name (`User` → `users`)
  - You can override collection name:

```js
const User = mongoose.model("User", userSchema, "myCustomCollection");
```

## ✏️ CRUD Operations

### **Create**

```ts
Model.create(doc: object | object[], callback?: Function): Promise<Document>
```

- `doc`: single object or array of objects to insert
- `callback`: optional function after insertion
- **Returns:** Promise resolving to created document(s)

**Example:**

```js
await User.create({
  name: "itachi",
  email: "itachi@example.com",
  age: 17,
  skills: ["Node.js"],
});
```

### **Read**

```ts
Model.find(filter: object, projection?: object, options?: object, callback?: Function): Promise<Document[]>
Model.findOne(filter: object, projection?: object, options?: object, callback?: Function): Promise<Document | null>
Model.findById(id: string, projection?: object, options?: object, callback?: Function): Promise<Document | null>
```

- `filter` → query conditions
- `projection` → select which fields to return
- `options` → `{ sort, limit, skip }`
- **Returns:** Promise resolving to document(s)

**Example:**

```js
// Multiple documents
const ninjas = await User.find(
  { age: { $gte: 16 } },
  { name: 1, email: 1 },
  { sort: { age: -1 } }
);

// Single document
const itachi = await User.findOne({ email: "itachi@example.com" });

// Find by ID
const byId = await User.findById("507f1f77bcf86cd799439011");
```

### **Update**

```ts
Model.updateOne(filter: object, update: object, options?: object, callback?: Function): Promise<UpdateResult>
Model.updateMany(filter: object, update: object, options?: object, callback?: Function): Promise<UpdateResult>
```

- `filter` → documents to update
- `update` → update operators (`$set`, `$inc`, `$push`, `$pull`)
- `options` → optional `{ upsert, runValidators }`
- **Returns:** Promise resolving to update summary

**Example:**

```js
// Set age
await User.updateOne({ email: "itachi@example.com" }, { $set: { age: 18 } });

// Increment age for multiple users
await User.updateMany({ age: { $lt: 18 } }, { $inc: { age: 1 } });
```

### **Delete**

```ts
Model.deleteOne(filter: object, callback?: Function): Promise<DeleteResult>
Model.deleteMany(filter: object, callback?: Function): Promise<DeleteResult>
```

- `filter` → documents to delete
- **Returns:** Promise resolving to deletion summary

**Example:**

```js
await User.deleteOne({ name: "itachi" });
await User.deleteMany({ age: { $lt: 15 } });
```

## 🛠️ Document Instance Methods

```ts
document.save(): Promise<Document>
document.remove(): Promise<DeleteResult>
document.set(fields: object): void
document.populate(path: string, options?: object): Promise<Document>
document.toObject(options?: object): object
document.toJSON(options?: object): object
```

- Use these **on a document returned by `findOne` or `findById`**
- Avoids extra queries if you already have the object

**Example:**

```js
const user = await User.findOne({ email: "itachi@example.com" });

// Update multiple fields
user.set({ age: 21, name: "itachi Uchiha" });

// Modify arrays
user.skills.push("genjutsu");
user.skills.pull("ninjutsu");

// Save changes
await user.save();

// Delete this document
// await user.remove();
```

## ⚡ Common Mongoose Operators

```js
$set: {
  field: value;
} // Replace or assign a new value
$inc: {
  field: number;
} // Increment or decrement numeric fields
$push: {
  field: value;
} // Add element(s) to an array
$pull: {
  field: value;
} // Remove element(s) from an array
$addToSet: {
  field: value;
} // Add element to array if it doesn't already exist
$pop: {
  field: 1 | -1;
} // Remove first (1) or last (-1) element from array
```

**Example:**

```js
// Replace age
await User.updateOne({ name: "itachi" }, { $set: { age: 18 } });

// Increment age
await User.updateOne({ name: "itachi" }, { $inc: { age: 1 } });

// Add to array
await User.updateOne({ name: "itachi" }, { $push: { skills: "genjutsu" } });

// Remove from array
await User.updateOne({ name: "itachi" }, { $pull: { skills: "ninjutsu" } });

// Add if not exists
await User.updateOne({ name: "itachi" }, { $addToSet: { skills: "taijutsu" } });

// Remove first element
await User.updateOne({ name: "itachi" }, { $pop: { skills: 1 } });
```

## 📈 Indexing & Query Optimization

```ts
Model.createIndex(spec: object, options?: object): Promise<string>
```

- `spec` → `{ field: 1 | -1 }` ascending/descending
- `options` → `{ unique: true, sparse: true }`
- **Returns:** Promise resolving to index name

**Example:**

```js
await User.createIndex({ email: 1 }, { unique: true });
```

## 💡 NoSQL Concepts

- **Denormalization** → Embed related data to reduce JOINs
- **Transactions** → Multi-document atomic operations
- **Normalization vs Denormalization** → Denormalization often preferred for performance
- **Scaling**:

  - Vertical → upgrade server resources
  - Horizontal (Sharding) → split data across multiple servers

- **Referencing vs Embedding**:

  - Embedding → data accessed together often
  - Referencing → large/rarely accessed data

**Denormalized Example:**

```js
// Embedded posts
const user = {
  name: "itachi",
  posts: [
    { title: "Post 1", content: "..." },
    { title: "Post 2", content: "..." },
  ],
};

// Normalized
Users: {
  _id, name;
}
Posts: {
  _id, userId, title, content;
}
```

## 🖥️ Basic `mongosh` Commands

`mongosh` is the MongoDB js. You can use it to **view, create, and delete databases or collections**—similar to what you do in the Atlas UI.

> **Tip:** Commands in `mongosh` are basically JavaScript, so you can use the same functions and syntax we explained earlier for Mongoose (like `find`, `insertOne`, `updateOne`, etc.) directly in the shell.

### **Show Databases**

```bash
show dbs
```

- Lists all databases on the server
- Only databases with data are shown

### **Select / Create Database**

```bash
use databaseName;
```

- Switches to the database `databaseName`
- Creates the database if it doesn’t exist

### **Show Collections**

```bash
show collections
```

- Lists all collections (tables) in the current database

### **Create Collection**

```js
db.createCollection("collectionName");
```

- Creates a new collection manually
- Optional, since collections are auto-created when inserting the first document

### **Drop Collection**

```js
db.collectionName.drop();
```

- Deletes a collection and all its documents

### **Drop Database**

```js
db.dropDatabase();
```

- Deletes the current database completely
