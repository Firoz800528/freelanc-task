import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// Layouts & Common Components
import MainLayout from "./layouts/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import NotFound from "./components/NotFound";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import Terms from "./pages/Terms";
import About from "./pages/About";

import BrowseTasks from "./pages/BrowseTasks";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import TaskDetails from "./pages/TaskDetails";
import MyPostedTasks from "./pages/MyPostedTasks";
import MyProfile from "./pages/MyProfile";
import UpdateProfile from "./pages/UpdateProfile";
import TaskBids from "./pages/TaskBids";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardAllItems from "./pages/dashboard/DashboardAllItems";
import DashboardAddItem from "./pages/dashboard/DashboardAddItem";
import DashboardMyItems from "./pages/dashboard/DashboardMyItems";
import DashboardMyProfile from "./pages/dashboard/DashboardMyProfile";

function AppWithAuthCheck() {
  const { loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />

        {/* Public route */}
        <Route path="/browse-tasks" element={<BrowseTasks />} />

        {/* Private routes */}
        <Route
          path="/add-task"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-task/:id"
          element={
            <PrivateRoute>
              <UpdateTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks/:id"
          element={
            <PrivateRoute>
              <TaskDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-posted-tasks"
          element={
            <PrivateRoute>
              <MyPostedTasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/task-bids/:id"
          element={
            <PrivateRoute>
              <TaskBids />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          }
        />

        {/* Dashboard - nested private routes */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="all-items" element={<DashboardAllItems />} />
          <Route path="add-item" element={<DashboardAddItem />} />
          <Route path="my-items" element={<DashboardMyItems />} />
          <Route path="my-profile" element={<DashboardMyProfile />} />
        </Route>
      </Route>

      {/* Fallback 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppWithAuthCheck />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
