const apiBase = 'http://localhost:8080';

export async function getCategories() {
  const res = await fetch(`${apiBase}/api/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${apiBase}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function createOrder(body) {
  const res = await fetch(`${apiBase}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export async function addOrderItems(orderId, items) {
  const res = await fetch(`${apiBase}/api/orders/${orderId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
  if (!res.ok) throw new Error('Failed to add order items');
  return res.json();
}

export async function signup(body) {
  const res = await fetch(`${apiBase}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Signup failed' }));
    throw new Error(error.message || 'Signup failed');
  }
  return res.json();
}

export async function login(body) {
  const res = await fetch(`${apiBase}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'Login failed');
  }
  return res.json();
}
