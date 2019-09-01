# Simple Email Editor

## Contents
- [Basic Requirements](#basic-requirements)
- [Installing Tools](#installing-tools)

## Basic Requirements

1. Apache server 
2. PHP > 7.2
3. Mysql or MariaDB
4. NodeJS and npm

## Installing Tools

1. Create a user and database in Mysql/MariaDB

```mysql
    CREATE DATABASE your_database;
    CREATE USER 'your_user'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD("your_password");
    GRANT ALL PRIVILEGES ON youe_database.* TO 'your_user'@'localhost' WITH GRANT OPTION;
```

2. Copy .env.example to .env and modify database connection section:
```mysql
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database
    DB_USERNAME=your_user
    DB_PASSWORD=your_password
```

3. Run install composer to add Laravel dependencies
```sh
    php install composer
```

4. Ejecute Laravel migrations to add the tables on your database
```sh
    php artisan migrate
```

5. Run the app
```sh
    npm install
    npm run dev
    php artisan serve
```