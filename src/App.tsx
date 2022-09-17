import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage, HomePage } from "./pages";
import { PrivateRoute } from "components/routes/PrivateRoute";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "initialization/theme";

export const App = (): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute component={<HomePage />} />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};
