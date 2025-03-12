# AdminDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.7.

## Setup Instructions

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Application:**

   ```bash
   ng serve
   ```

4. **Access the App:** Open your browser and navigate to `http://localhost:4200/`.

## Architecture Overview

- **Layouts:**

  - The project follows a two-layout approach: `Admin Layout` and `User Layout` to enhance security.
  - The `Dashboard Module` has been implemented, and any other admin route will follow the same structure.

- **Modules:**

  - `AppModule` - Root module that bootstraps the application.
  - `DashboardModule` - Manages the admin dashboard.
  - **Note:** Each side-bar route will be a separate module with its UI components.

- **Shared Components:**

  - `TopNavComponent`
  - `SideBarComponent`
  - `LoadingComponent`

- **Services:**

  - `AuthService` - Manages authentication and user data.
  - `LoggedInUserService` - Tracks notifications using signals. If we integrate Firebase or real-time data, signals offer better performance compared to `BehaviorSubject`.

- **Guards:**

  - `AuthGuard` - Protects routes based on user authentication and role.

## Design Choices and Trade-offs

- **Two Layouts for Security:**

  - The admin and user layouts were separated to enhance security and role-based access.
  - The admin dashboard is implemented first, and additional admin routes will follow the same module-based approach.

- **Loading Spinner:**

  - A loading spinner for the entire dashboard UI was not implemented to avoid delaying the dashboard while waiting for API responses.

- **Mock Login System:**

  - Users can log in with any first name and last name.
  - Authentication is role-based, and only the role determines access via `AuthGuard`.

- **User UI:**

  - If you log in with a normal user, you'll find some text describing that this is the User UI, showcasing how routes are protected.
