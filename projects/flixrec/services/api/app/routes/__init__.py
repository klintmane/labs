from aiohttp import web
import app.populate as populate
import app.db as db
import app.locate as locate

routes = web.RouteTableDef()


@routes.get("/")
async def root(req):
    return web.json_response({"success": True})


@routes.get("/movies")
async def list_movies(req):
    page = req.rel_url.query.get("page", "0")
    movies = await db.list_movies(req.app["db_conn"], page=int(page))
    movies = list(map(lambda m: dict(m), movies))
    return web.json_response({"success": True, "data": movies})


@routes.get("/movies/top")
async def top_movies(req):
    page = req.rel_url.query.get("page", "0")
    movies = await db.top_movies(req.app["db_conn"], page=int(page))
    movies = list(map(lambda m: dict(m), movies))
    return web.json_response({"success": True, "data": movies})


@routes.get("/genres")
async def genres(req):
    genres = await db.list_genres(req.app["db_conn"])
    genres = list(map(lambda g: dict(g), genres))
    return web.json_response({"success": True, "data": genres})


@routes.get("/populate/ratings")
async def populate_ratings(req):
    err = await populate.ratings(req.app["db_conn"])
    if err is None:
        return web.json_response({"success": True})
    return web.json_response({"success": False, "error": str(err)})


@routes.get("/populate/movies")
async def populate_movies(req):
    err = await populate.movies(req.app["db_conn"])
    if err is None:
        return web.json_response({"success": True})
    return web.json_response({"success": False, "error": str(err)})


@routes.get("/geoloc")
async def geoloc(req):
    peername = req.transport.get_extra_info("peername")
    if peername is not None:
        host, _ = peername
        err, location = locate.city(host)
        if err is None:
            return web.json_response({"success": True, "data": location})
        return web.json_response({"success": False, "error": str(err)})

    return web.json_response({"success": False, "error": "Could not get ip"})
