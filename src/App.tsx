import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import ToolDetail from "./pages/ToolDetail";
import SubmitTool from "./pages/SubmitTool";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Stack from "./pages/Stack";
import About from "./pages/About";
import FAQ from "./pages/FAQ";

import PresetsPage from "./pages/Presets";
import PresetDetailPage from "./pages/PresetDetail";
import StackExportPage from "./pages/StackExport";

// Top-level layout: a fixed Navbar and Footer wrap all routed pages.
// This keeps the shell consistent across the whole app.
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tools" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/tools/:id" element={<ToolDetail />} />
          <Route path="/submit" element={<SubmitTool />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/stack" element={<Stack />} />

          <Route path="/presets" element={<PresetsPage />} />
          <Route path="/presets/:id" element={<PresetDetailPage />} />
          <Route path="/export" element={<StackExportPage />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}
