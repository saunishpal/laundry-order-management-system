from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
from uuid import uuid4
from pathlib import Path

app = FastAPI(title="Mini Laundry Order Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

orders = []

PRICE_LIST = {
    "shirt": 50,
    "pants": 70,
    "saree": 120,
    "kurta": 80,
    "coat": 200,
    "bedsheet": 150
}

VALID_STATUSES = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"]


class GarmentItem(BaseModel):
    garment: str
    quantity: int


class OrderCreate(BaseModel):
    customer_name: str
    phone_number: str
    garments: List[GarmentItem]


class StatusUpdate(BaseModel):
    status: str


def render_page(file_name: str):
    html_path = Path(f"templates/{file_name}")
    return HTMLResponse(html_path.read_text(encoding="utf-8"))


@app.get("/", response_class=HTMLResponse)
def home_page():
    return render_page("home.html")


@app.get("/create-order", response_class=HTMLResponse)
def create_order_page():
    return render_page("create-order.html")


@app.get("/orders-page", response_class=HTMLResponse)
def orders_page():
    return render_page("orders.html")


@app.get("/dashboard-page", response_class=HTMLResponse)
def dashboard_page():
    return render_page("dashboard.html")


@app.get("/price-list-page", response_class=HTMLResponse)
def price_list_page():
    return render_page("price-list.html")


@app.post("/orders")
def create_order(order: OrderCreate):
    total_bill = 0
    garment_details = []

    for item in order.garments:
        garment_name = item.garment.lower()

        if garment_name not in PRICE_LIST:
            raise HTTPException(
                status_code=400,
                detail=f"Garment '{item.garment}' is not available in price list"
            )

        if item.quantity <= 0:
            raise HTTPException(
                status_code=400,
                detail="Quantity must be greater than 0"
            )

        price = PRICE_LIST[garment_name]
        subtotal = price * item.quantity
        total_bill += subtotal

        garment_details.append({
            "garment": garment_name,
            "quantity": item.quantity,
            "price_per_item": price,
            "subtotal": subtotal
        })

    new_order = {
        "order_id": str(uuid4())[:8].upper(),
        "customer_name": order.customer_name,
        "phone_number": order.phone_number,
        "garments": garment_details,
        "total_bill": total_bill,
        "status": "RECEIVED",
        "created_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "estimated_delivery_date": (datetime.now() + timedelta(days=3)).strftime("%Y-%m-%d")
    }

    orders.append(new_order)

    return {
        "message": "Order created successfully",
        "order": new_order
    }


@app.get("/orders")
def get_orders(
    status: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    garment: Optional[str] = Query(None)
):
    filtered_orders = orders

    if status:
        status = status.upper()
        filtered_orders = [
            order for order in filtered_orders
            if order["status"] == status
        ]

    if search:
        search_lower = search.lower()
        filtered_orders = [
            order for order in filtered_orders
            if search_lower in order["customer_name"].lower()
            or search_lower in order["phone_number"]
        ]

    if garment:
        garment_lower = garment.lower()
        filtered_orders = [
            order for order in filtered_orders
            if any(item["garment"] == garment_lower for item in order["garments"])
        ]

    return {
        "total": len(filtered_orders),
        "orders": filtered_orders
    }


@app.put("/orders/{order_id}/status")
def update_order_status(order_id: str, status_update: StatusUpdate):
    new_status = status_update.status.upper()

    if new_status not in VALID_STATUSES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Use one of: {VALID_STATUSES}"
        )

    for order in orders:
        if order["order_id"] == order_id:
            order["status"] = new_status
            return {
                "message": "Order status updated successfully",
                "order": order
            }

    raise HTTPException(status_code=404, detail="Order not found")


@app.get("/dashboard")
def dashboard():
    total_orders = len(orders)
    total_revenue = sum(order["total_bill"] for order in orders)

    orders_per_status = {
        "RECEIVED": 0,
        "PROCESSING": 0,
        "READY": 0,
        "DELIVERED": 0
    }

    for order in orders:
        orders_per_status[order["status"]] += 1

    return {
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "orders_per_status": orders_per_status
    }


@app.get("/price-list")
def get_price_list():
    return PRICE_LIST