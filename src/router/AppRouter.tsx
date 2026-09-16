import {
  lazy,
  Suspense,
  type ReactNode,
} from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "@/layouts/MainLayout";

import About from "@/pages/About/About";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound/NotFound";

const Business = lazy(() => import("@/pages/Business/Business"));
const BusinessDetail = lazy(
  () => import("@/pages/Business/BusinessDetail"),
);
const Media = lazy(() => import("@/pages/Media/Media"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const Publications = lazy(
  () => import("@/pages/Publications/Publications"),
);
const PublicationDetail = lazy(
  () => import("@/pages/Publications/PublicationDetail"),
);
const BookVGA = lazy(() => import("@/pages/BookVGA/BookVGA"));

const lazyPage = (page: ReactNode) => (
  <Suspense
    fallback={<div className="route-loading-shell" aria-hidden="true" />}
  >
    {page}
  </Suspense>
);

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/business" element={lazyPage(<Business />)} />
          <Route path="/business/:slug" element={lazyPage(<BusinessDetail />)} />
          <Route path="/media" element={lazyPage(<Media />)} />
          <Route path="/contact" element={lazyPage(<Contact />)} />
          <Route path="/book-vga" element={lazyPage(<BookVGA />)} />
          <Route
            path="/publications"
            element={lazyPage(<Publications />)}
          />
          <Route path="/library" element={<Navigate to="/about#library" replace />} />
          <Route path="/about/library" element={<Navigate to="/about#library" replace />} />
          <Route path="/news/*" element={<Navigate to="/media" replace />} />
          <Route path="/publications/:slug" element={lazyPage(<PublicationDetail />)} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
