import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage, HomePage } from "./pages";
import { PrivateRoute } from "components/routes/PrivateRoute";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "initialization/firebase";
import { extendTheme } from "@chakra-ui/react";
import dayjs from "dayjs";
dayjs().format();

const theme = extendTheme({
  fonts: {
    heading: `'Roboto Mono', sans-serif`,
    body: `'Roboto Mono', sans-serif`,
  },
});

export const App = (): JSX.Element => {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<PrivateRoute component={<HomePage />} />}
            />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ChakraProvider>
    </AuthContextProvider>
  );
};
