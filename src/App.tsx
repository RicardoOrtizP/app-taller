import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes/AppRouting";
import { Toast } from "@heroui/react";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
