import React from 'react'
import {Landing,Login,HomeLayout,Register, DashboardLayout,MapViewer, Insights, Issues, Report,Mission} from './pages'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import "leaflet/dist/leaflet.css";
import {action as registerAction} from './pages/Register';
import {action as ReportAction} from './pages/Report';
import {action as LoginAction} from './pages/Login';
import {loader as InsightsLoader} from './pages/Insights';
import {loader as MapViewerLoader} from './pages/MapViewer';
import {loader as IssuesLoader} from './pages/Issues';


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
      action:LoginAction,
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
          element:<Insights/>,
          loader:InsightsLoader,
        },
        {
          path:'mapview',
          element:<MapViewer/>,
          loader:MapViewerLoader,
        },
        {
          path:'Issues',
          element:<Issues/>,
          loader:IssuesLoader,
        },
        {
          path:"report",
          element:<Report/>,
          action:ReportAction,
        },
        {
          path:"mission",
          element:<Mission/>,
          
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