
FROM python:3-alpine

# Required for the postgres driver
RUN apk add build-base

WORKDIR /src

# Copy dep requirements
COPY requirements.txt .

# Install deps
RUN pip install -r requirements.txt

# Copy project
COPY . .

CMD ["python", "-m", "watchgod", "app.main"]
