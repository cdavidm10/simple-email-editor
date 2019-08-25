Initial commmit Simple email editor


CREATE DATABASE email_editor_db;
CREATE USER 'email_editor_usr'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD("email.2019pws");
GRANT ALL PRIVILEGES ON email_editor_db.* TO 'email_editor_usr'@'localhost' WITH GRANT OPTION;