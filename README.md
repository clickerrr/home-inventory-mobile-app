# 📦 Home Inventory Mobile App

A cross-platform mobile application built with **React Native** and **Java**, designed to help users efficiently manage and organize their household items. This app allows users to categorize and monitor their home inventory seamlessly.

---

## 🚀 Features

- ✅**Inventory Management**: Add, edit, and delete items with details like name, category, quantity, and location.
- ✅**Categorization**: Organize items into customizable categories for better tracking.
- ✅**Location Mapping**: Specify locations for items so that you are always aware of where they may be, this can also apply to multiple homes.
- ✅**Responsive UI**: Clean and intuitive interface optimized for both Android and iOS devices.
- 🚧 Connect to backend database.
- 🚧 Implement item image uploads.
- 🚧 Implement removal and editing of existing items.
- 🚧 Implement notifications for expired items.
- 🚧 Implement household sharing and user logins.
- 🚧 Implement more robust barcode support (external APIs).

---

## 🛠️ Tech Stack

| Layer         | Technology                |
|---------------|----------------------------|
| Frontend      | React Native (via Expo)    |
| Backend       | Java Spring Boot           |
| Database      | MySQL (Communication via JPA)  |
| API Comm (WIP 🚧)      | Axios                      |
| Navigation    | React Navigation           |

---

## 📁 Project Structure

```
home-inventory-mobile-app/
├── app/
│   ├── (tabs)/                   # Main screns
│   ├── camera_screens/           # Camera screens
│   ├── homelayout_screens/       # Home Layout screens
│   ├── inventory_screens/        # Inventory screens
│   ├── logged_item_creation/     # Logged Item Creation screens
│   ├── newproduct/               # New Product screens
│   ├── _layout.tsx               # Primary layout for app
├── components/
│   ├── CameraScanner.tsx         # Reusable camera scanner components
│   ├── ProductAdder.tsx          # Reusable product adder
│   ├── RoomSelector.tsx          # Reusable room selector
├── sampleData/                   # For sample data without the need for API
├── styles/                       # Reusable stylesheets
└── types/                        # Types commonly used
```

---

## 🔧 Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/clickerrr/home-inventory-mobile-app.git
   cd home-inventory-mobile-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   bun install
   ```
   
3. **Run the app:**

   ```bash
   npm run dev
   # or
   bun run dev
   ```

---

## 👤 Author

**Bartek Swiech**

- [LinkedIn](https://www.linkedin.com/in/bartosz-swiech/)
- [GitHub](https://github.com/clickerrr)
