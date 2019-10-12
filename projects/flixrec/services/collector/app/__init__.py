from aiohttp import web
import app.cors as cors
from app.db import db

routes = web.RouteTableDef()


@routes.get("/")
async def root(req):
    events = db["events"]
    document = {"key": "value"}
    res = await events.insert_one(document)
    return web.Response(text=str(res.inserted_id))


def main():
    app = web.Application()
    app.add_routes(routes)
    cors.setup(app)
    web.run_app(app)
