import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Error from "./components/Error.jsx";
import DetailView from "./components/DetailView.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<App />} />
      <Route path="/brewery/:id" element={<DetailView />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);
