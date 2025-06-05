

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import TradingDashboard from '@/pages/TradingDashboard';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';
import NeuralInsightsDashboard from '@/pages/NeuralInsightsDashboard';
import AssetUploadForm from '@/components/AssetUploadForm';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/neural-insights" element={<NeuralInsightsDashboard />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/upload" element={
              <ProtectedRoute>
                <AssetUploadForm />
              </ProtectedRoute>
            } />
            <Route
              path="/trading"
              element={
                <ProtectedRoute>
                  <TradingDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
