FROM python:3.10-slim

WORKDIR /app

COPY src/requirements.txt .

RUN pip3 install -r requirements.txt --no-cache-dir

COPY src/. .

COPY data/. ../data

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]