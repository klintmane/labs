import asyncio
from aiohttp import web

from app.routes import routes
import app.db as db
import app.cors as cors


async def init():
    app = web.Application()
    app.add_routes(routes)
    cors.setup(app)

    app["db_conn"] = await db.connect()

    return app


def main():
    loop = asyncio.get_event_loop()
    app = loop.run_until_complete(init())
    web.run_app(app)
