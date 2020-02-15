create schema namegator;

create table namegator.item (
    id int,
    type varchar(100) not null,
    description varchar(150) not null
)

  insert into namegator.item(type, description) values("prefix","Air");
  insert into namegator.item(type, description) values("prefix","Jet");
  insert into namegator.item(type, description) values("prefix","Flight");
  insert into namegator.item(type, description) values("sufix","Hub");
  insert into namegator.item(type, description) values("sufix","Station");
  insert into namegator.item(type, description) values("sufix","Mart");