# Mini Laundry Order Management System

A simple and stylish **AI-first Laundry Order Management System** built for a Software Engineering assignment.

This project helps a dry-cleaning/laundry store create customer orders, calculate bills automatically, update order status, view/filter orders, and track basic business dashboard data.

---

## Project Objective

The objective of this assignment is to build a lightweight system for a dry-cleaning store to manage daily laundry orders.

The system supports:

- Creating laundry orders
- Generating unique order IDs
- Calculating total bill amount
- Updating order status
- Viewing and filtering orders
- Showing basic dashboard data
- Demonstrating AI-assisted development

---

## Tech Stack Used

- **Backend:** FastAPI
- **Frontend:** HTML, CSS, JavaScript
- **Language:** Python
- **Storage:** In-memory storage
- **API Testing:** FastAPI Swagger UI
- **AI Tools Used:** ChatGPT / GitHub Copilot

---

## Features Implemented

### 1. Create Order

The user can create a laundry order by entering:

- Customer name
- Phone number
- Garment type
- Quantity

The system automatically calculates the total bill based on the garment price list.

---

### 2. Unique Order ID

Every order gets a unique order ID generated using UUID logic.

Example:

```txt
A8F29C1B