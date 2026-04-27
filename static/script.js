function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function createOrder() {
  const customerName = document.getElementById("customerName").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();
  const garment = document.getElementById("garment").value;
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!customerName || !phoneNumber || !quantity || quantity <= 0) {
    showToast("Please fill all fields properly");
    return;
  }

  const orderData = {
    customer_name: customerName,
    phone_number: phoneNumber,
    garments: [
      {
        garment: garment,
        quantity: quantity
      }
    ]
  };

  try {
    const response = await fetch("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (response.ok) {
      showToast("Order created successfully");

      const createdOrderBox = document.getElementById("createdOrderBox");

      createdOrderBox.classList.remove("hidden");
      createdOrderBox.innerHTML = `
        <h3>✅ Order Created Successfully</h3>
        <p><strong>Order ID:</strong> ${data.order.order_id}</p>
        <p><strong>Customer:</strong> ${data.order.customer_name}</p>
        <p><strong>Total Bill:</strong> ₹${data.order.total_bill}</p>
        <p><strong>Status:</strong> ${data.order.status}</p>
        <p><strong>Estimated Delivery:</strong> ${data.order.estimated_delivery_date}</p>
      `;

      document.getElementById("customerName").value = "";
      document.getElementById("phoneNumber").value = "";
      document.getElementById("quantity").value = "";
    } else {
      showToast(data.detail || "Something went wrong");
    }
  } catch (error) {
    showToast("Unable to create order");
  }
}

async function loadOrders() {
  const searchInput = document.getElementById("searchInput");
  const statusFilter = document.getElementById("statusFilter");

  const search = searchInput ? searchInput.value.trim() : "";
  const status = statusFilter ? statusFilter.value : "";

  let url = "/orders?";
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (status) url += `status=${encodeURIComponent(status)}&`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const ordersDiv = document.getElementById("orders");
    const orderCount = document.getElementById("orderCount");

    if (!ordersDiv) return;

    ordersDiv.innerHTML = "";

    if (orderCount) {
      orderCount.innerText = `${data.total} Orders`;
    }

    if (data.orders.length === 0) {
      ordersDiv.innerHTML = `
        <div class="empty-state">
          <h3>No orders found</h3>
          <p>Create a new order or change your search/filter.</p>
        </div>
      `;
      return;
    }

    data.orders.forEach(order => {
      const garments = order.garments.map(g =>
        `<div>• ${capitalize(g.garment)} × ${g.quantity} = ₹${g.subtotal}</div>`
      ).join("");

      ordersDiv.innerHTML += `
        <div class="order-box">
          <div class="order-top">
            <div>
              <p class="order-id">ORDER ID: ${order.order_id}</p>
              <h3 class="customer-name">${order.customer_name}</h3>
            </div>

            <span class="status-pill status-${order.status}">
              ${order.status}
            </span>
          </div>

          <div class="order-meta">
            <div class="meta-box">
              <span>Phone</span>
              <strong>${order.phone_number}</strong>
            </div>

            <div class="meta-box">
              <span>Total Bill</span>
              <strong>₹${order.total_bill}</strong>
            </div>

            <div class="meta-box">
              <span>Created</span>
              <strong>${order.created_at}</strong>
            </div>

            <div class="meta-box">
              <span>Delivery</span>
              <strong>${order.estimated_delivery_date}</strong>
            </div>
          </div>

          <div class="garment-list">
            ${garments}
          </div>

          <div class="status-update">
            <select id="status-${order.order_id}">
              <option value="RECEIVED" ${order.status === "RECEIVED" ? "selected" : ""}>RECEIVED</option>
              <option value="PROCESSING" ${order.status === "PROCESSING" ? "selected" : ""}>PROCESSING</option>
              <option value="READY" ${order.status === "READY" ? "selected" : ""}>READY</option>
              <option value="DELIVERED" ${order.status === "DELIVERED" ? "selected" : ""}>DELIVERED</option>
            </select>

            <button class="btn-secondary" onclick="updateStatus('${order.order_id}')">
              Update Status
            </button>
          </div>
        </div>
      `;
    });
  } catch (error) {
    showToast("Unable to load orders");
  }
}

async function updateStatus(orderId) {
  const status = document.getElementById(`status-${orderId}`).value;

  try {
    const response = await fetch(`/orders/${orderId}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: status })
    });

    const data = await response.json();

    if (response.ok) {
      showToast("Order status updated");
      loadOrders();
    } else {
      showToast(data.detail || "Unable to update status");
    }
  } catch (error) {
    showToast("Unable to update status");
  }
}

async function loadDashboard() {
  try {
    const response = await fetch("/dashboard");
    const data = await response.json();

    const dashboard = document.getElementById("dashboard");

    if (!dashboard) return;

    dashboard.innerHTML = `
      <div class="stat-card">
        <p>Total Orders</p>
        <h3>${data.total_orders}</h3>
      </div>

      <div class="stat-card">
        <p>Total Revenue</p>
        <h3>₹${data.total_revenue}</h3>
      </div>

      <div class="stat-card">
        <p>Received</p>
        <h3>${data.orders_per_status.RECEIVED}</h3>
      </div>

      <div class="stat-card">
        <p>Processing</p>
        <h3>${data.orders_per_status.PROCESSING}</h3>
      </div>

      <div class="stat-card">
        <p>Ready</p>
        <h3>${data.orders_per_status.READY}</h3>
      </div>

      <div class="stat-card">
        <p>Delivered</p>
        <h3>${data.orders_per_status.DELIVERED}</h3>
      </div>
    `;
  } catch (error) {
    showToast("Unable to load dashboard");
  }
}