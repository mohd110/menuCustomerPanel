# 🌸 Café Fleur - Static UI Edition

This repository contains the **Customer Menu** for Café Fleur. It is currently configured as a high-fidelity **Static UI**, decoupled from any backend. This makes it easy to preview and integrate with a new backend service later.

## 📁 Current Folder Structure

```text
menu/                         ← Customer-facing menu (scanned via QR)
├── index.html                ← Main menu and checkout page (Single Page App)
├── css/
│   └── menu.css              ← Contains all styling (Dark Green, Gold, Beige theme)
└── js/
    ├── config.js             ← Global settings (Mode, WhatsApp #, Cafe Details)
    ├── menu-data.js          ← The menu items & categories (Edit this to change menu)
    ├── cart.js               ← Logic for adding/removing items
    ├── order.js              ← SIMULATED order logic (Static UI Mode)
    └── app.js                ← Main UI logic
```

---

## 🛠️ How the Menu Works

If you want to understand or edit the code:

1. **`index.html`**: The main structure. It toggles between the Menu and Checkout views.
2. **`app.js`**: Renders items from `menu-data.js` and handles all UI transitions.
3. **`cart.js`**: Manages the shopping cart state in memory.
4. **`order.js`**: Handles the final "Place Order" button. In its current **Static UI** state, it simulates a successful backend request with a 1.2s delay and shows a success modal. 

---

## 🎨 How to Edit Menu Items

Open `menu/js/menu-data.js`. Each item looks like this:

```javascript
{
  id: 15,
  name: 'New Coffee',
  description: 'A brand new drink',
  price: 150,
  image: 'https://link-to-your-image.jpg'
}
```
*Note: Ensure every item has a unique `id`!*

---

## 🚀 Integrating a New Backend

To connect a new backend:
1. Open `menu/js/order.js`.
2. Replace the simulated `Promise` in `placeOrder` with a real `fetch()` request to your API.
3. Update `menu/js/config.js` with any necessary API keys or base URLs.
