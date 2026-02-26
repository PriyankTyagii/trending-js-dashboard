import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Repos from "./pages/Repos.jsx";
import Articles from "./pages/Articles.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/repos" element={<Repos />} />
      <Route path="/articles" element={<Articles />} />
    </Routes>
  );
}