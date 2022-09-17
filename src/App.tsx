import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage, HomePage } from "./pages";
import { PrivateRoute } from "components/routes/PrivateRoute";

export const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute component={<HomePage />} />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
};
