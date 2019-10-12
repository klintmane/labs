from aiohttp import ClientSession
import app.db as db

session = ClientSession()
base = "https://raw.githubusercontent.com/sidooms/MovieTweetings/master/snapshots/10K/"


async def ratings(db_conn):
    resp = await session.get(base + "ratings.dat")
    data = await resp.text()
    ratings = db.parse_ratings(data)

    try:
        await db.insert_ratings(db_conn, ratings)
        return None

    except db.Error as err:
        return err


async def movies(db_conn):
    resp = await session.get(base + "movies.dat")
    data = await resp.text()
    movies = db.parse_movies(data)

    try:
        await db.insert_movies(db_conn, movies)
        return None

    except db.Error as err:
        return err
