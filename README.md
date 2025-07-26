# fleetify-frontend
Fleetify is a React-based web app for managing company and driver records. It uses Tailwind CSS for styling and supports role-based access (RBAC). Admin users can add, edit, and view data, while other roles have read-only access. JWT is used for authentication, and the app communicates with backend REST APIs.


##  Tech Stack

- React.js
- Tailwind CSS
- Axios
- React Router DOM
- JWT (for secure route access)
- Vercel (deployment)

##  Features

- **Role-Based Dashboards**:
  - Admin: Full access
  - Driver & Company: Read-only limited access
- **Data Management**:
  - Add, edit, delete, and view company and driver details
- **Pagination & Search**
- **Authentication**:
  - JWT-based login system
  - Role-controlled navigation
- **Reusable Components**
- **Toggle Sidebar UI**
- **Responsive Design**

##  Live Demo

App URL:  
[https://fleetify-frontend-hkol.vercel.app/](https://fleetify-frontend-hkol.vercel.app/)

### Test Login Credentials

- Email: `Basava@gmail.com`
- Password: `Basava@123`

You may also create a new Driver or Company user and log in with that to test limited access.

##  Folder Structure


|   App.css
|   App.jsx
|   constants.jsx
|   main.jsx
|   MyRouter.jsx
|   
+---assets
|   |   react.svg
|   |
|   \---images
|           company.png
|           driver.jpg
|           logo.png
|
+---components
|   +---common
|   |       Button.jsx
|   |       Input.jsx
|   |    
|   |       LoginInput.jsx
|   |       Table.jsx
|   |
|   +---layout
|   |       Header.jsx
|   |       layout.jsx
|   |       Logo.jsx
|   |       Sidebar.jsx
|   |
|   \---ui
|           HamburgerMenu.jsx
|           Pagination.jsx
|
+---constants
|       role.jsx
|
+---context
|       AuthContext.jsx
|
+---hooks
|       useDebounce.js
|       useToggle.js
|
+---pages
|   |   NotFound.jsx
|   |
|   +---Admin
|   |   |   createNewUser.jsx
|   |   |   Dashboard.jsx
|   |   |
|   |   +---companies
|   |   |       AddCompany.jsx
|   |   |       EditCompany.jsx
|   |   |       ViewCompanies.jsx
|   |   |
|   |   \---drivers
|   |           AddDriver.jsx
|   |           EditDriver.jsx
|   |           ViewDrivers.jsx
|   |
|   +---auth
|   |       Login.jsx
|   |
|   +---company
|   |       Dashboard.jsx
|   |
|   \---Driver
|           Dashboard.jsx
|
\---services
        adminService.js
        api.js
        auth.js

        
##  Installation


# Clone the repo
git clone https://github.com/sbasavam/fleetify-frontend.git

# Install dependencies
cd fleetify-frontend
npm install 

# Set environment variable
# Create a .env file in the root
REACT_APP_BASE_URL=https://fleetify-backend.onrender.com

# Run the app
npm run dev
