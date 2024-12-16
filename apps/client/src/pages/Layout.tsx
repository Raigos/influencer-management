import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Navigation } from '@/components/Navigation.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/components/AppRoutes.tsx'
import { Toaster } from '@/components/ui/toaster.tsx'
import { Footer } from '@/components/Footer.tsx'

const queryClient = new QueryClient()

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b">
            <Navigation />
          </header>

          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <AppRoutes />
            </div>
          </main>
          <Footer />
          <Toaster />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default Layout
