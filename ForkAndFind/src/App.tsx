import { useEffect } from "react"
import { Toaster as Sonner } from "./components/ui/sonner" // This will manage toasts
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import './App.css'
import NotFound from "./pages/NotFound"
import ProductDetails from "./pages/ProductDetails"
import { SearchProvider } from "./context/SearchContext"
import { toast } from "sonner" // Import toast function to trigger toasts

function App() {
  const queryClient = new QueryClient()

  useEffect(() => {
    // Show the toast when the app loads
    toast.warning(
      "Heads up! If data isn't loading, Open Food Facts might've changed their API structure. You may need to update the code accordingly or change the port number as instructed in readme.md file.",
      {
        duration: 8000,
      }
    );
  }, []) // Empty dependency array ensures this runs only once when the app loads

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Only include Sonner here to handle toasts */}
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
