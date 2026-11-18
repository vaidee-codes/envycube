import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Header from "../../molecules/Header";
import Footer from "../../molecules/Footer";
import NotFound from "../../molecules/NotFound";
import Home from "../Home";
import About from "../About";
import Services from "../Services";
import Works from "../Works";
import WorksDetail from "../WorksDetail";
import Contact from "../Contact";
import styles from "./App.module.scss";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/services" Component={Services} />
          <Route path="/works" Component={Works} />
          <Route path="/works/:id" Component={WorksDetail} />
          <Route path="/contact" Component={Contact} />
          {/* Old home URL, kept so existing links and bookmarks still work */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" Component={NotFound} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
