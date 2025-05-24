import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import TaskDetails from "./pages/TaskDetails";
import MyPostedTasks from "./pages/MyPostedTasks";
import PrivateRoute from "./routes/PrivateRoute";
import BrowseTasks from "./pages/BrowseTasks";
import MyProfile from "./pages/MyProfile";
import UpdateProfile from "./pages/UpdateProfile";
import TaskBids from "./pages/TaskBids";
import NotFound from "./components/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
          
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/browse-tasks" element={<BrowseTasks />} />
             <Route path="*" element={<NotFound />} />
             <Route path="/my-tasks" element={<MyPostedTasks />} />
        <Route path="/task-bids/:id" element={<TaskBids />} />

            
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
              path="/task-bids/:id"
              element={
                <PrivateRoute>
                  <TaskBids />
                </PrivateRoute>
              }
            />
            <Route
              path="/task-details/:id"
              element={
                <PrivateRoute>
                  <TaskDetails />
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

           
            <Route path="*" element={<p className="p-4">Page Not Found</p>} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
