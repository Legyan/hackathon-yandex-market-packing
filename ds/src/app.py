from fastapi import FastAPI, Request
import uvicorn
import argparse
from model import predict
from pydantic import BaseModel
from typing import List

class Item(BaseModel):
    sku: str
    count: int
    size1: str
    size2: str
    size3: str
    weight: str
    type: List[str]

class Order(BaseModel):
    orderId: str
    items: List[Item]

app = FastAPI(debug=True)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/pack")
def get_prediction(request: Order):
    y = predict(request.dict())
    return y


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", default=8000, type=int, dest="port")
    parser.add_argument("--host", default="0.0.0.0", type=str, dest="host")
    args = vars(parser.parse_args())

    uvicorn.run(app, **args)
    