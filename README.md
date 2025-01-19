# TravelTrucks

# React + Vite

TravelTrucks is a frontend web application for a camper rental company. This application allows users to explore a catalog of available campers, view detailed information about individual campers, read reviews, and book their dream camper.

---

## Features

1. **Homepage**:

    - Includes a banner with a call-to-action button to navigate to the catalog.

2. **Catalog Page**:

    - Displays a list of campers with filters for location, camper type, and additional features (AC, kitchen, etc.).
    - Allows users to add campers to a favorites list.
    - Includes a "Load More" button to dynamically fetch more results.

3. **Camper Details Page**:

    - Displays detailed information about a selected camper.
    - Features a gallery with a Lightbox for viewing images.
    - Includes reviews with a five-star rating system.
    - Booking form with a notification upon successful submission.

4. **Global State Management**:

    - Redux is used to manage global states like the camper list, filters, and favorites.

5. **Notifications**:

    - Integrated with `react-toastify` for user-friendly notifications.

6. **API Integration**:

    - Fetches camper data from [Mock API](https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers).

7. **Routing**:

    - Configured with `react-router-dom` for seamless navigation across pages.

8. **Responsive Design**:
    - Desktop-first approach with optional mobile adaptability.

---

## Pages and Routes

-   `/` - Homepage with a banner and call-to-action.
-   `/catalog` - Catalog of available campers with filters.
-   `/catalog/:id` - Detailed page for individual campers.

---

## Installation and Setup

### Prerequisites

-   Node.js (v16 or later)
-   npm or yarn

### Steps to Run Locally

1. Clone the repository:

    ```bash
    git clone https://github.com/BonyageDarkness/Travel_Trucks.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Travel_Trucks
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open the app in your browser at:
    ```
    http://localhost:5173
    ```

### Building for Production

To build the app for production, run:

```bash
npm run build
```

The optimized output will be in the `dist` folder.

---

## Technologies Used

-   **React**: Frontend framework
-   **Redux**: State management
-   **React Router**: Client-side routing
-   **Axios**: HTTP client
-   **React Toastify**: Notifications
-   **CSS Modules**: Styling
-   **Vite**: Build tool

---

## Author

-   **Name**: Bohdan Pastushenko
-   **Location**: Portnablagh, Co. Donegal, Ireland
-   **GitHub**: [BonyageDarkness](https://github.com/BonyageDarkness)
-   **LinkedIn**: [Bohdan Pastushenko](https://www.linkedin.com/in/bohdan-pastushenko-763627231/)

---

## Acknowledgements

-   Mock API provided by [MockAPI.io](https://mockapi.io).
-   Design inspiration from the project brief.

---

## License

This project is licensed under the MIT License.
