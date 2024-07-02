import React from "react";
import Dashboard from "./dashboard";
import ViewDetails from "./view";
import Search from "./search";
import Backup from "./backup";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/view/:id" element={<ViewDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/backup" element={<Backup />} />
        </Routes>
      </Router>
    </div>
  );
}
