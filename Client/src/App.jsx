import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import Home from "./components/home";
import SignUp from "./components/signUp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/logIn";
import BookAvailable from "./components/bookAvailable";
import BookIssue from "./components/BookIssue";
import "./App.css";
import MyBooks from "./components/MyBooks";
import 'bootstrap/dist/css/bootstrap.min.css';
import ManageUser from "./components/admin/ManageUser";


function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/bookavailable',
      element: <BookAvailable />
    },
    {
      path: '/bookissue/:id',
      element: <BookIssue />
    },
    {
      path: '/mybooks',
      element: <MyBooks />
    },
    {
      path: '/usermanage',
      element: <ManageUser />
    }

  ]
)

  return (
    <>
      <div>
          <RouterProvider router={appRouter} />
      </div>
    </>
  )
}

export default App
