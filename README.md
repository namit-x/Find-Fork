# 🥄🍴 Fork & Find

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-000000?style=for-the-badge&logo=radix-ui&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-121212?style=for-the-badge&logo=lucide&logoColor=white)

---

**Fork & Find** is a powerful food product explorer built on top of the [OpenFoodFacts API](https://world.openfoodfacts.org/). It allows users to search, filter, and explore global food product data with ease. Clean UI, fast responses, and real-time insights — it’s data discovery done right.

---

## 🚀 Features

- 🔍 **Search & Explore**: Find products by name or barcode.
- 🧠 **Category Filtering**: Focus on meaningful categories with **10,000+ products**.
- 📊 **Sorting**: Sort alphabetically and by nutrition grade (A–E).
- 📦 **Detailed Product View**:
  - Product image, ingredients, and nutrition breakdown
  - Labels like *vegan*, *gluten-free*, etc.
- 🔁 **Infinite Scrolling**: For seamless exploration.
- 🔢 **Barcode Search**: Search with GTIN barcodes.
- 🧹 **Data Cleanup**: Only products with valid name/image/barcode are shown.
- ⚡ **Optimized Fetching**:
  - Minimal payload
  - Partial field queries
- 🛡 **Robust Error Handling**:
  - Safe rendering using `safeRender()`
- 📱 **Responsive UI**: Fully mobile-friendly.

---

## ⚙️ Tech Stack Summary

| Tool             | Description                                                     |
|------------------|-----------------------------------------------------------------|
| **React + TS**   | Component-driven, statically typed frontend                     |
| **Vite**         | Super-fast build tool                                           |
| **Tailwind CSS** | Utility-first styling                                           |
| **Radix UI**     | Accessible and composable UI primitives                         |
| **React Router** | Seamless navigation between pages                               |
| **Lucide Icons** | Lightweight, consistent icon set                                |

---

## 🧠 Architecture Decisions

- 🎯 **Targeted Fetching**: Only what’s needed = faster response + less clutter.
- 🧼 **Data Validation**: Filter out entries without essential data.
- 🧯 **Safe Rendering**: Custom fallback handler prevents crashes.
- 📂 **Smart Categories**: Only categories with over **10K products** included to improve content quality.

---

## ❗ Troubleshooting API Issues

If you see:

![ERR_CONNECTION_TIMED_OUT](/public/image.png)

It may be due to OpenFoodFacts rate-limiting or IP blocks. Here’s what you can do:
- You can change the port inside vite.config.ts (i.e. 5173 to 4322)
- Switch to a **mobile hotspot**.
- Try using a **VPN with a different region**.
- Limit your requests if testing frequently (consider debouncing search).

---

## 📌 API References

- 🔍 **Search by name**:  
  `https://world.openfoodfacts.org/cgi/search.pl?search_terms={name}&json=true`

- 📦 **Search by barcode**:  
  `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`

- 🗂 **Filter by category**:  
  `https://world.openfoodfacts.org/category/{category}.json`

---

## 🙌 Contributions

Feel free to fork, contribute, and enhance **Fork & Find**. Let's make food discovery smarter, cleaner, and more accessible together!

---

## 🛠 Getting Started

Follow these steps to set up **Fork & Find** locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/namit-x/Find-Fork
cd ForkAndFind

npm install
npm run dev
```

The app will be running at [http://localhost:5173](http://localhost:5173)


> 💡 **Note:** If OpenFoodFacts doesn’t respond, try switching networks or tweaking your config.