DROP TABLE IF EXISTS movies;
CREATE TABLE movies (
  id      text      primary key,
  title   text      not null,
  genres  text[]    not null,
  year    smallint  not null
);