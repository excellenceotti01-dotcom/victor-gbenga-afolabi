import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import Home from "@/pages/Home/Home";
import About from "@/pages/About/About";
import Business from "@/pages/Business/Business";
import Media from "@/pages/Media/Media";
import Contact from "@/pages/Contact/Contact";
import Publications from "@/pages/Publications/Publications";
import BookVGA from "@/pages/BookVGA/BookVGA";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/business" element={<Business />} />
          <Route path="/media" element={<Media />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-vga" element={<BookVGA />} />
          <Route path="/publications" element={<Publications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}