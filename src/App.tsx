import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ApartmentDetail from "./pages/ApartmentDetail";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";

// Placeholder pages for other sections
const About = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-3xl font-heading font-bold mb-6">About NYC Apartment Alchemy</h1>
    <p className="mb-4">Our mission is to revolutionize the way New Yorkers find their perfect apartment through advanced semantic search technology.</p>
    <p>More details coming soon...</p>
  </div>
);

const Contact = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-3xl font-heading font-bold mb-6">Contact Us</h1>
    <p className="mb-4">Have questions about our service? We'd love to hear from you!</p>
    <p>Contact form coming soon...</p>
  </div>
);

const Blog = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-3xl font-heading font-bold mb-6">Blog</h1>
    <p className="mb-4">NYC apartment insights and tips coming soon...</p>
  </div>
);

const ForListers = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-3xl font-heading font-bold mb-6">For Apartment Listers</h1>
    <p className="mb-4">Information for property owners and managers coming soon...</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/apartments/:id" element={<ApartmentDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/for-listers" element={<ForListers />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
