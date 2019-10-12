import geoip2.database

reader = geoip2.database.Reader("app/locate/GeoLite2-City.mmdb")


def city(ip):
    try:
        location = reader.city(ip)
        return None, location

    except Exception as err:
        return err, None
