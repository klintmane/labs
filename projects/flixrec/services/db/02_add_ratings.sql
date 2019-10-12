DROP TABLE IF EXISTS ratings;
CREATE TABLE ratings (
  id          serial     primary key,
  user_id     text       not null,
  movie_id    text       not null,
  rating      real       not null,
  created_at  timestamp  not null
);
