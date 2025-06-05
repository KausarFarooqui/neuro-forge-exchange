import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"
import { QueryClient } from '@tanstack/react-query';

import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import TradingDashboard from '@/pages/TradingDashboard';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/ProtectedRoute';
import NeuralInsightsDashboard from '@/pages/NeuralInsightsDashboard';

function App() {
  return (
    <QueryClient>
      <div className="min-h-screen bg-background">
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/neural-insights" element={<NeuralInsightsDashboard />} />
            <Route path="/auth" element={<Auth />} />
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
    </QueryClient>
  );
}

export default App;
