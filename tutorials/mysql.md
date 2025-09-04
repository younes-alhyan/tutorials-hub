# 🗄️ MySQL Tutorial

[<img src="../icons/mysql.svg" width="250"/>](https://www.mysql.com/)

**Learn MySQL essentials, creating and connecting to databases (local & remote), relational concepts, tables, data types, constraints, SQL queries (CRUD, joins, aggregations), table relations (foreign keys, normalization), and transactions.** 🚀

## 📌 Table of Contents

1. [🏁 Introduction & Setup](#🏁-introduction--setup)
2. [🗄️ Database Structure & Concepts](#🗄️-database-structure--concepts)
3. [🏗️ Creating Databases & Tables](#🏗️-creating-databases--tables)
4. [✏️ CRUD Operations](#✏️-crud-operations)
5. [📌 Indexes](#📌-indexes)
6. [🛠️ Table Relations & Constraints](#🛠️-table-relations--constraints)
7. [🔗 Joins](#🔗-joins)
8. [📊 Aggregations](#📊-aggregations)
9. [⚡ Transactions](#⚡-transactions)
10. [💡 Tips & Best Practices](#💡-tips--best-practices)

## 🏁 Introduction & Setup

- **MySQL** → Relational database management system (RDBMS) that uses SQL to manage data.
- SQL is the **language**, MySQL is the **database engine**.
- Common uses: backend APIs, web apps, analytics, and structured data storage.

### Install MySQL

- **Local:** Download [MySQL Community Server](https://dev.mysql.com/downloads/mysql/)
- **Remote:** Use hosting services or cPanel / phpMyAdmin
- CLI:

```bash
mysql -u root -p
```

## 🗄️ Database Structure & Concepts

- **Database** → container of tables
- **Table** → collection of rows (records) and columns (fields)
- **Column** → defines data type and constraints
- **Row (Record)** → single data entry

### Common Data Types

| Type            | Description            |
| --------------- | ---------------------- |
| INT             | Integer numbers        |
| BIGINT          | Large integers         |
| VARCHAR(n)      | Variable-length string |
| TEXT            | Large text             |
| DATE / DATETIME | Date or timestamp      |
| BOOLEAN         | True/False             |
| DECIMAL / FLOAT | Decimal numbers        |

### Constraints

- `PRIMARY KEY` → unique + not null, identifies row
- `UNIQUE` → no duplicate values
- `NOT NULL` → mandatory column
- `DEFAULT` → default value
- `AUTO_INCREMENT` → automatically increase integer

## 🏗️ Creating Databases & Tables

### Show Databases

```sql
SHOW DATABASES;
```

### Create Database

```sql
CREATE DATABASE myAppDB;
USE myAppDB;
```

### Show Tables

```sql
SHOW TABLES;
```

### Create Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Alter Table / Columns

#### 1️⃣ Add a new column

```sql
ALTER TABLE users
ADD COLUMN password VARCHAR(255) NOT NULL AFTER username;
```

#### 2️⃣ Modify a column’s type or parameters

```sql
ALTER TABLE users
MODIFY COLUMN email VARCHAR(150) NOT NULL DEFAULT 'unknown@example.com';
```

#### 3️⃣ Rename a column

```sql
ALTER TABLE users
CHANGE COLUMN username user_name VARCHAR(50) UNIQUE NOT NULL;
```

#### 4️⃣ Move a column position

```sql
ALTER TABLE users
MODIFY COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP FIRST;
```

#### 5️⃣ Drop a column

```sql
ALTER TABLE users
DROP COLUMN password;
```

## ✏️ CRUD Operations

### **Create**

```sql
INSERT INTO users (username, email) VALUES ('user', 'user@example.com');
```

### **Read**

```sql
SELECT * FROM users;
SELECT username, email FROM users WHERE id = 1;
```

### **Update**

```sql
UPDATE users SET email = 'user2@example.com' WHERE id = 1;
```

### **Delete**

```sql
DELETE FROM users WHERE id = 1;
```

## 📌 Indexes

Indexes are **special lookup tables** that the database keeps to **speed up searches**. They don’t change the order of the main table — they just map column values to the **rows where they exist**. Think of it like a **table of contents in a book**.

### Why use indexes

- Makes `SELECT` queries faster, especially on large tables.
- Useful for columns frequently used in `WHERE`, `JOIN`, or `ORDER BY`.
- **Note:** Indexes slightly slow down `INSERT`, `UPDATE`, or `DELETE` because they need updating.

### Create an index

```sql
-- Simple index
CREATE INDEX idx_username ON users(username);

-- Unique index (prevents duplicates)
CREATE UNIQUE INDEX idx_email_unique ON users(email);

-- Composite index (multiple columns)
CREATE INDEX idx_name_email ON users(username, email);
```

> The database uses the index to jump directly to the matching row instead of scanning the whole table.

## 🛠️ Table Relations & Constraints

### Foreign Key Example

```sql
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(100),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Explanation:**

- `user_id` in `posts` **references** `id` in `users`.
- This is called a **foreign key**, which enforces a **relationship between tables**.
- **Rules enforced automatically by MySQL:**

  - You **cannot insert** a `user_id` that does not exist in `users.id`.
  - Deleting a user in `users` **may fail or affect posts**, depending on the `ON DELETE` behavior (`RESTRICT`, `CASCADE`, `SET NULL`).
  - Updating a user’s `id` in `users` is controlled by `ON UPDATE` rules (default: `RESTRICT`).

> Think of a foreign key as a **link or pointer** from one table to another that ensures the referenced data always exists.

### Relationship Types

- **One-to-One:** each user has exactly one profile
- **One-to-Many:** each user can have multiple posts
- **Many-to-Many:** students ↔ courses via a **junction table**

```sql
CREATE TABLE student_courses (
  student_id INT,
  course_id INT,
  PRIMARY KEY(student_id, course_id),
  FOREIGN KEY(student_id) REFERENCES students(id),
  FOREIGN KEY(course_id) REFERENCES courses(id)
);
```

**Explanation:**

- `student_id` references `students.id` and `course_id` references `courses.id`.
- The **composite primary key** `(student_id, course_id)` ensures that each student-course pair is **unique**.
- Foreign keys enforce **data integrity**:

  - You cannot enroll a student that does not exist.
  - You cannot link to a course that does not exist.
  - Optionally, you can add `ON DELETE CASCADE` to remove enrollments automatically when a student or course is deleted.

### **Normalization**

**1NF – First Normal Form**

- ✅ **Atomic values only:** No column should contain multiple or repeating values.
- ❌ **Arrays or lists are generally not considered 1NF** in SQL, because each column should hold a single atomic value.
- 💡 Think: **one cell = one value**, not a collection.

**2NF – Second Normal Form**

- ✅ **Full dependency on primary key:** Every non-primary-key column must depend on the **entire primary key**.
- Example: If your table has a composite primary key `(A, B)`, **no column should depend on just `A` or just `B`**.
- 💡 Focus: avoid **partial dependencies**.

**3NF – Third Normal Form**

- ✅ **No transitive dependencies:** Non-primary-key columns must **not depend on other non-primary-key columns**.
- Example: If `column C` depends on `column B` (which is **not a primary key**), move `B` and `C` to a **separate table**.
- 💡 Focus: ensure **all non-key columns depend only on the primary key**.

## 🔗 Joins

### Common Types of Joins

1. **INNER JOIN**
   Returns only the rows that have matching values in both tables.

   ```sql
   SELECT users.username, posts.title
   FROM users
   INNER JOIN posts ON users.id = posts.user_id;
   ```

   - Here, only users who have posts will appear in the result.
   - `users.id` matches `posts.user_id`.

2. **LEFT JOIN (or LEFT OUTER JOIN)**
   Returns all rows from the left table, and matching rows from the right table. If no match exists, `NULL` is returned for the right table.

   ```sql
   SELECT users.username, posts.title
   FROM users
   LEFT JOIN posts ON users.id = posts.user_id;
   ```

   - All users will appear, even if they have no posts. Posts for users without any will be `NULL`.

3. **RIGHT JOIN (or RIGHT OUTER JOIN)**
   Returns all rows from the right table, and matching rows from the left table.

   ```sql
   SELECT users.username, posts.title
   FROM users
   RIGHT JOIN posts ON users.id = posts.user_id;
   ```

   - All posts will appear, even if they are not linked to a user.

4. **FULL OUTER JOIN**
   Returns all rows from both tables, with `NULL` where there is no match.

   ```sql
   SELECT users.username, posts.title
   FROM users
   FULL OUTER JOIN posts ON users.id = posts.user_id;
   ```

   - Combines the effect of LEFT and RIGHT joins: nothing is excluded.

## 📊 Aggregations

Aggregations are functions that summarize data from multiple rows into a single value. Often combined with `GROUP BY` to organize data by categories.

### Common Aggregation Functions

1. **COUNT()** – Counts rows.

   ```sql
   SELECT COUNT(*) AS total_users
   FROM users;
   ```

   - Counts all users in the table.

2. **AVG()** – Calculates the average of a numeric column.

   ```sql
   SELECT AVG(amount) AS average_order
   FROM orders;
   ```

   - Gives the average amount across all orders.

3. **SUM()** – Adds up all values in a column.

   ```sql
   SELECT SUM(amount) AS total_sales
   FROM orders;
   ```

4. **GROUP BY** – Groups rows that have the same value in a column and allows aggregate functions on each group.

   ```sql
   SELECT category, SUM(amount) AS total_category_sales
   FROM orders
   GROUP BY category;
   ```

   - Sums the `amount` for each `category`.
   - Each category appears only once with the total of its orders.

5. **Other useful aggregation functions**:

   - `MIN()` – smallest value in a column
   - `MAX()` – largest value in a column

## ⚡ Transactions

```sql
START TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

COMMIT;
```

- All-or-nothing operations to maintain data integrity

## 💡 Tips & Best Practices

- Use **parameterized queries** / prepared statements to prevent SQL injection
- Index frequently queried columns for performance:
- Keep **table names singular** or plural consistently
- Understand **JOINs & relations** before designing tables
