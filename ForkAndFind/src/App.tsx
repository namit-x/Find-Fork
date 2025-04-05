import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import './App.css'
import NotFound from "./pages/NotFound"
import ProductDetails from "./pages/ProductDetails"
import { SearchProvider } from "./context/SearchContext"

function App() {
  const queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SearchProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/product/:code" element={<ProductDetails />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SearchProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
