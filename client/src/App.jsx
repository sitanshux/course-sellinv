
import React from 'react'
import Login from './pages/Login'
import Navbar from './components/navbar'
import HeroSection from './pages/student/HeroSection'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Courses from './pages/student/Courses'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    children:[
      {
        path:"/",
        element:
        <>
        <HeroSection />
        <Courses />
        </>
      },
      {
        path:"login",
        element:<Login />
      }
    ]
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={appRouter}/>
    </main>
  )
}

export default App
