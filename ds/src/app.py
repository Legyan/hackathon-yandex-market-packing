import argparse
from typing import List, Optional

import uvicorn
from fastapi import FastAPI
from model import predict
from pydantic import BaseModel


class Item(BaseModel):
    sku: str
    count: int
    size1: Optional[str] = None
    size2: Optional[str] = None
    size3: Optional[str] = None
    weight: Optional[str] = None
    type: List[Optional[str]]


class Order(BaseModel):
    orderId: str
    items: List[Item]


app = FastAPI(debug=True)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/pack")
def get_prediction(request: Order):
    try:
        y = predict(request.dict())
        return y
    except Exception:
        return {'status': 'fallback'}


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", default=8000, type=int, dest="port")
    parser.add_argument("--host", default="0.0.0.0", type=str, dest="host")
    args = vars(parser.parse_args())

    uvicorn.run(app, **args)
