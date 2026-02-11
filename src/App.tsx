import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SideBar } from '@/components/layout/SideBar';
import { MonthPage } from '@/pages/MonthPage';
import { FinancePage } from '@/pages/FinancePage';
import { TotalAssetsPage } from '@/pages/TotalAssetsPage';

function App() {
  return (
    <div className="w-full h-dvh bg-background flex">
      <BrowserRouter>
        <SideBar></SideBar>
        <main className="flex-1 h-full">
          <Routes>
            <Route path="/" element={<MonthPage />} />
            <Route path="/total" element={<TotalAssetsPage />} />
            <Route path="/finance" element={<FinancePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
