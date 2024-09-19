import React from 'react'
import {Landing,Login,HomeLayout,Register, DashboardLayout,MapViewer, Insights, Issues, Report} from './pages'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import {action as registerAction} from './pages/Register';


const router= createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout/>,
    children:[
    {
      index:true,
      element:<Landing/>
    },
    {
      path:'/login',
      element: <Login/>,
    },
    {
      path:'/register',
      element: <Register/>,
      action:registerAction,
    },
    {
      path:'/dashboard',
      element:<DashboardLayout/>,
      children:[
        {
          index:true,
          element:<Insights/>
        },
        {
          path:'mapview',
          element:<MapViewer/>
        },
        {
          path:'Issues',
          element:<Issues/>
        },
        {
          path:"report",
          element:<Report/>
        }
      ]
      
    }
  ]
  },
 
])
const  App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default  App