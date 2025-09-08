import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { routes } from './Routes/Routes.jsx'
import { Toaster } from 'react-hot-toast'
import AuthProvider from './Context/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster />
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={routes}>
      </RouterProvider>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)
