// main routing file
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage, Website } from "../pages";

export default function AllRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Website />} />
        </Route>
      </Routes>
    </Router>
  );
}
