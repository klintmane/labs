import asyncpg
import os
from datetime import datetime


Error = asyncpg.PostgresError


async def connect():
    return await asyncpg.create_pool(os.environ["DB_CONN"])


def list_movies(db, page=0, page_size=25):
    return db.fetch(
        "SELECT * FROM movies ORDER BY year DESC, id ASC OFFSET $1 LIMIT $2",
        page * page_size,
        page_size,
    )


def top_movies(db, page=0, page_size=10):
    return db.fetch(
        """
        SELECT movie_id AS id, movies.title, AVG(rating) AS rating
        FROM ratings
        INNER JOIN movies ON ratings.movie_id=movies.id
        GROUP BY movie_id, movies.title
        OFFSET $1
        LIMIT $2
        """,
        page * page_size,
        page_size,
    )


def list_genres(db):
    return db.fetch(
        "SELECT UNNEST(genres) AS genre, COUNT(*) FROM movies GROUP BY genre"
    )


def insert_movies(db, movies):
    return db.executemany(
        "INSERT INTO movies(id, title, genres, year) VALUES($1, $2, $3, $4)", movies
    )


def insert_ratings(db, ratings):
    return db.executemany(
        "INSERT INTO ratings(user_id, movie_id, rating, created_at) VALUES($1, $2, $3, $4)",
        ratings,
    )


def parse_movies(data):
    movies = []
    for d in data.split(sep="\n"):
        movie = d.split(sep="::")
        if len(movie) == 3:
            [id, title, genres] = movie

            title_year = title.split("(")
            title = title_year[0]
            year = title_year[1][:-1]

            genres = genres.split("|")

            movies.append((id, title, genres, int(year)))
    return movies


def parse_ratings(data):
    ratings = []
    for d in data.split(sep="\n"):
        rating = d.split(sep="::")
        if len(rating) == 4:
            [user_id, movie_id, rating, timestamp] = rating
            ratings.append(
                (
                    user_id,
                    movie_id,
                    float(rating),
                    datetime.utcfromtimestamp(int(timestamp)),
                )
            )
    return ratings
