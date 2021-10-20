CREATE TABLE pizza(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price FLOAT NOT NULL
);

CREATE TABLE ingredient(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE pizza_ingredient(
    pizza_id VARCHAR(255) NOT NULL,
    ingredient_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (pizza_id) REFERENCES pizza(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredient(id)
);

CREATE TABLE restaurant_user(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL"
);

CREATE TABLE restaurant_order(
    id VARCHAR(255) PRIMARY KEY,
    date DATE NOT NULL,
    price FLOAT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES restaurant_user(id)
);

CREATE TABLE restaurant_order_pizza(
    order_id VARCHAR(255) NOT NULL,
    pizza_id VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES restaurant_order(id),
    FOREIGN KEY (pizza_id) REFERENCES pizza(id)
);