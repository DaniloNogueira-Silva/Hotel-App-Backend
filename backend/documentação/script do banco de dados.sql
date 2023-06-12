CREATE TABLE forncedor (
  id_fornecedor SERIAL  NOT NULL ,
  name VARCHAR    ,
  cnpj VARCHAR      ,
PRIMARY KEY(id_fornecedor));




CREATE TABLE hotel (
  id_hotel SERIAL  NOT NULL ,
  name VARCHAR    ,
  address VARCHAR    ,
  phone VARCHAR    ,
  stars FLOAT    ,
  check-in DATE    ,
  check-out DATE      ,
PRIMARY KEY(id_hotel));




CREATE TABLE order_client (
  id_order SERIAL  NOT NULL ,
  status_2 VARCHAR      ,
PRIMARY KEY(id_order));




CREATE TABLE category (
  id_category SERIAL  NOT NULL ,
  name VARCHAR      ,
PRIMARY KEY(id_category));




CREATE TABLE room_type (
  id_room_type SERIAL  NOT NULL ,
  id_hotel INTEGER   NOT NULL ,
  name VARCHAR    ,
  description VARCHAR    ,
  capacity INTEGER    ,
  price FLOAT      ,
PRIMARY KEY(id_room_type));




CREATE TABLE pub (
  id_pub SERIAL  NOT NULL ,
  id_hotel INTEGER   NOT NULL   ,
PRIMARY KEY(id_pub));




CREATE TABLE client (
  id_client SERIAL  NOT NULL ,
  id_hotel INTEGER   NOT NULL ,
  name VARCHAR    ,
  email VARCHAR    ,
  cpf VARCHAR    ,
  phone VARCHAR      ,
PRIMARY KEY(id_client));




CREATE TABLE employee (
  id_employee SERIAL  NOT NULL ,
  id_hotel INTEGER   NOT NULL ,
  name VARCHAR    ,
  data_nascimento DATE    ,
  data_contratacao DATE    ,
  salario FLOAT    ,
  role VARCHAR      ,
PRIMARY KEY(id_employee));




CREATE TABLE room (
  id_room SERIAL  NOT NULL ,
  id_hotel INTEGER   NOT NULL ,
  id_room_type INTEGER   NOT NULL ,
  number INTEGER    ,
  status_room VARCHAR      ,
PRIMARY KEY(id_room));




CREATE TABLE booking (
  id_booking SERIAL  NOT NULL ,
  id_room INTEGER   NOT NULL ,
  id_client INTEGER   NOT NULL ,
  id_hotel INTEGER   NOT NULL ,
  check-in DATE    ,
  check-out DATE      ,
PRIMARY KEY(id_booking));




CREATE TABLE product (
  id_product SERIAL  NOT NULL ,
  id_fornecedor INTEGER   NOT NULL ,
  id_pub INTEGER   NOT NULL ,
  id_category INTEGER   NOT NULL ,
  name VARCHAR    ,
  quantity INTEGER    ,
  price INTEGER      ,
PRIMARY KEY(id_product));




CREATE TABLE order_items (
  id_order INTEGER   NOT NULL ,
  id_product INTEGER   NOT NULL   ,
PRIMARY KEY(id_order, id_product));





