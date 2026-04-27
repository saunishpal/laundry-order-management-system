# Laundry Order Management System

An **AI-first Mini Laundry Order Management System** built for a Software Engineering assignment.

This project helps a dry-cleaning/laundry store manage customer orders, calculate bills automatically, update order status, search/filter orders, and view basic dashboard insights through a clean multi-page web interface.

---

## Project Overview

A dry-cleaning store needs a lightweight system to manage daily laundry orders.

This system allows the store owner or staff to:

- Create new laundry orders
- Generate unique order IDs
- Calculate billing automatically
- Track order status
- View and filter orders
- Monitor total revenue and order counts
- View a predefined garment price list

The project was developed using an **AI-first approach**, where AI tools were used for planning, coding assistance, UI improvement, debugging, and documentation.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | FastAPI |
| Language | Python |
| Frontend | HTML, CSS, JavaScript |
| Storage | In-memory storage |
| API Docs | FastAPI Swagger UI |
| AI Tools | ChatGPT, GitHub Copilot |

---

## Features Implemented

### 1. Create Order

Users can create a new laundry order by entering:

- Customer name
- Phone number
- Garment type
- Quantity

After submitting the form, the system automatically generates:

- Unique order ID
- Total bill amount
- Initial order status
- Estimated delivery date

---

### 2. Automatic Bill Calculation

The system uses a predefined garment price list.

| Garment | Price |
|---|---:|
| Shirt | ₹50 |
| Pants | ₹70 |
| Saree | ₹120 |
| Kurta | ₹80 |
| Coat | ₹200 |
| Bedsheet | ₹150 |

Example:

```txt
2 Shirts × ₹50 = ₹100

3. Unique Order ID

Each order gets a unique order ID using UUID logic.

Example:

E8F844E5
4. Order Status Management

Each order can have one of the following statuses:

RECEIVED
PROCESSING
READY
DELIVERED

The status can be updated from the Orders page.

5. View and Filter Orders

The system allows users to:

View all created orders
Search by customer name
Search by phone number
Filter by order status
6. Dashboard

The dashboard displays:

Total orders
Total revenue
Orders in RECEIVED status
Orders in PROCESSING status
Orders in READY status
Orders in DELIVERED status
7. Estimated Delivery Date

Each order automatically receives an estimated delivery date, calculated as 3 days after the order creation date.

8. Multi-Page Frontend

The frontend is divided into separate pages:

Page	Purpose
Home	Project overview and navigation
Create Order	Add new laundry order
Orders	View, search, filter, and update orders
Dashboard	View business summary
Price List	View garment prices
API Docs	Test APIs using Swagger UI
9. Modern UI Design

The frontend includes:

Glassmorphism design
Animated gradient background
Responsive layout
Stylish cards
Dashboard statistic cards
Status badges
Toast notifications
Clean navigation bar
Project Pages
Page	URL
Home	/
Create Order	/create-order
Orders	/orders-page
Dashboard	/dashboard-page
Price List	/price-list-page
API Documentation	/docs
API Endpoints
Method	Endpoint	Description
GET	/	Opens home page
GET	/create-order	Opens create order page
GET	/orders-page	Opens orders page
GET	/dashboard-page	Opens dashboard page
GET	/price-list-page	Opens price list page
POST	/orders	Creates a new laundry order
GET	/orders	Lists and filters orders
PUT	/orders/{order_id}/status	Updates order status
GET	/dashboard	Returns dashboard data
GET	/price-list	Returns garment price list
Folder Structure
laundry-order-management-system/
│
├── main.py
├── requirements.txt
├── README.md
├── Laundry_Order_Management_System_Project_Report.pdf
│
├── templates/
│   ├── home.html
│   ├── create-order.html
│   ├── orders.html
│   ├── dashboard.html
│   └── price-list.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── screenshots/
    ├── home.png
    ├── create-order.png
    ├── order-created.png
    ├── orders.png
    ├── dashboard.png
    ├── price-list.png
    └── api-docs.png
Setup Instructions
1. Clone the repository
git clone YOUR_GITHUB_REPOSITORY_LINK
cd laundry-order-management-system
2. Create a virtual environment
python -m venv venv
3. Activate the virtual environment

For Windows:

venv\Scripts\activate

For Mac/Linux:

source venv/bin/activate
4. Install dependencies
pip install -r requirements.txt
5. Run the project
uvicorn main:app --reload
6. Open the application

Open the following URL in your browser:

http://127.0.0.1:8000

API documentation:

http://127.0.0.1:8000/docs
How to Use
Create a New Order
Open the Create Order page.
Enter customer name.
Enter phone number.
Select garment type.
Enter quantity.
Click on Create Order.
The system will show order ID, total bill, status, and estimated delivery date.
View Orders
Open the Orders page.
All created orders will be displayed.
Use the search box to search by customer name or phone number.
Use the status dropdown to filter orders.
Update Order Status
Go to the Orders page.
Select a new status from the dropdown.
Click on Update Status.
The order status will be updated.
View Dashboard
Open the Dashboard page.
View total orders, revenue, and status-wise order count.
Sample Order Request
{
  "customer_name": "RISHI ROY",
  "phone_number": "9593891489",
  "garments": [
    {
      "garment": "shirt",
      "quantity": 2
    }
  ]
}
Sample Order Response
{
  "message": "Order created successfully",
  "order": {
    "order_id": "E8F844E5",
    "customer_name": "RISHI ROY",
    "phone_number": "9593891489",
    "garments": [
      {
        "garment": "shirt",
        "quantity": 2,
        "price_per_item": 50,
        "subtotal": 100
      }
    ],
    "total_bill": 100,
    "status": "RECEIVED",
    "created_at": "2026-04-27 13:13:34",
    "estimated_delivery_date": "2026-04-30"
  }
}
Screenshots
Home Page

Create Order Page

Order Created Successfully

Orders Page

Dashboard Page

Price List Page

API Documentation

Project Report

A detailed project report PDF is also included in this repository.

Laundry_Order_Management_System_Project_Report.pdf

The report contains:

Project objective
Problem statement
Technology stack
Features implemented
System workflow
API endpoints
Screenshots
AI usage report
Tradeoffs
Future improvements
Conclusion
AI Usage Report

This project was developed using an AI-first approach, as required by the assignment.

AI tools helped in planning, code generation, UI improvement, debugging, and documentation.

AI Tools Used
ChatGPT
GitHub Copilot
Where AI Helped

AI helped in:

Understanding the assignment requirements
Breaking the problem into smaller modules
Planning the project structure
Designing API endpoints
Creating the FastAPI backend
Creating frontend pages
Writing HTML, CSS, and JavaScript
Improving UI design
Adding animation and glassmorphism effects
Debugging frontend API calls
Writing README documentation
Preparing the final project report
Sample Prompts Used
Help me build a mini laundry order management system for a dry-cleaning store using FastAPI.
Create API endpoints for creating orders, updating order status, filtering orders, and showing dashboard data.
Generate a simple frontend using HTML, CSS, and JavaScript for this FastAPI laundry management project.
Make the frontend look more stylish with animations, glassmorphism design, cards, and responsive layout.
Convert this single-page laundry system into multiple separate pages like Home, Create Order, Orders, Dashboard, and Price List.
Write a professional README file for this software engineering assignment including AI usage report, tradeoffs, and setup instructions.
What AI Got Wrong

AI was helpful, but the generated output was not perfect.

Some issues were:

The first version had only a single-page UI.
The UI was too basic initially.
Separate page routing had to be added properly.
JavaScript functions had to be adjusted for different pages.
The initial version did not clearly show project tradeoffs.
Error handling and validation needed improvements.
The AI-generated documentation needed customization for the actual project.
What I Improved

I improved the project by:

Converting the frontend into a multi-page application.
Adding separate pages for Home, Create Order, Orders, Dashboard, and Price List.
Improving the UI with modern styling.
Adding animated background effects.
Adding responsive design.
Adding order search and status filtering.
Adding estimated delivery date.
Adding status badges.
Adding toast notifications.
Adding a clear README.
Creating a detailed project report PDF.
Keeping the system simple and assignment-focused.
Tradeoffs
What I Skipped

To keep the project lightweight and focused, I skipped:

Database integration
Authentication
Admin login
Payment system
Invoice PDF generation
Email/SMS notifications
Advanced analytics charts
Full production deployment
Reason for These Tradeoffs

The assignment clearly focuses on speed, execution, AI usage, problem-solving, and practical code quality.

So the project was intentionally kept simple and not over-engineered.

The main focus was to build a working system with clean code, clear documentation, and a presentable UI.

Limitations
The project uses in-memory storage.
Orders are lost when the server restarts.
It does not have user authentication.
The frontend currently supports one garment type per order.
It is not a production-ready system.
It is designed as an assignment project.
Future Improvements

With more time, the project can be improved by adding:

SQLite or MongoDB database
User authentication
Admin dashboard
Multiple garment selection in a single order
Invoice PDF generation
WhatsApp/SMS order notifications
Customer order history
Deployment on Render or Railway
React frontend
Revenue charts and analytics
Export orders as CSV/PDF
Evaluation Alignment

This project matches the assignment evaluation criteria:

Criteria	How this project satisfies it
Speed & Execution	Working system built with core features
AI Leverage	AI usage report, prompts, and improvements included
Problem Solving	Improved AI-generated code and fixed gaps
Code Quality	Simple, readable, and practical structure
Ownership Mindset	Added multi-page UI, report, screenshots, and bonus features
Author

Saunish Pal

Conclusion

The Mini Laundry Order Management System successfully implements the required assignment features.

It includes:

Order creation
Unique order ID generation
Automatic billing
Order status management
Order search and filtering
Dashboard data
Price list page
Multi-page frontend
AI usage report
Project report PDF

The project is simple, practical, readable, and built according to the assignment requirements.


















