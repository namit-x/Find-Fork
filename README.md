# **Fork & Find**

**Fork & Find** is a powerful food product explorer built on top of the [OpenFoodFacts API](https://world.openfoodfacts.org/), enabling users to search, filter, and explore global food product data with ease. It combines a high-performance tech stack with clean, responsive UI/UX design to deliver rich product insights in real-time.

---

## 🚀 Features

- **Search & Explore**: Quickly search for food products by name or barcode.
- **Category Filtering**: Navigate easily through food categories with over **10,000+ products**, focusing only on the most relevant segments.
- **Sort by Preference**: Sort product listings by name (A-Z, Z-A) and nutrition grade (asc/desc).
- **Detailed Product View**: Dive deep into any product’s:
  - Image & category
  - Ingredients
  - Nutrition grade (A to E)
  - Nutrition facts (energy, fat, carbs, protein, etc.)
  - Labels (vegan, gluten-free, etc.)
- **Pagination**: Infinite scrolling for seamless browsing.
- **Barcode Search**: Enter barcodes to retrieve product details instantly.
- **Data Validation & Cleanup**: Only showing the products which has key info like name, image, or barcode.
- **Performance-Optimized API Calls**:
  - Only fetches essential fields to reduce latency. (cannot able to apply it everywhere (cuz of API limitations) but where ever it was possible I did)
  - Filters at the source to minimize payload size.
- **Robust Error Handling**: Defensive programming techniques like `safeRender()` ensure UI reliability even when working with inconsistent API data.
- **Responsive Design**: Mobile-first and fully responsive across devices.

---

## ⚙️ Tech Stack

| Technology        | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| **React + TypeScript** | Component-driven, statically typed front-end architecture.              |
| **Tailwind CSS**       | Rapid UI development with mobile-first design utilities.               |
| **Vite**               | Lightning-fast build tool optimized for modern frameworks.              |
| **Radix UI**           | Accessible and composable UI primitives.                                |
| **React Router**       | Declarative routing and navigation for React apps.                      |
| **Lucide Icons**       | Lightweight and customizable iconography to complement the UI.          |

---

## 🧠 Architecture Decisions

- **Optimized Fetching**: Queries are scoped to only request necessary fields to enhance performance and responsiveness.
- **Data Sanitization**: Products with missing critical data (e.g., no name, barcode, or image) are omitted from the UI to ensure a clean browsing experience.
- **Safe Rendering**: Utility functions like `safeRender()` ensure graceful handling of null or undefined fields.
> 🔎 **Smart Category Filtering:**  
> Fork & Find **only includes categories with over 10,000 products**.  
> This ensures users engage with the most relevant, data-rich product segments — boosting discoverability and UX quality.


---

## ❗Troubleshooting API Connectivity

If you encounter an error like:

![ERR_CONNECTION_TIMED_OUT](/ForkAndFind/public/image.png)

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


> 💡 **Note:** If you encounter issues fetching data from OpenFoodFacts, check your internet connection or consider switching to a different network or VPN as mentioned above.