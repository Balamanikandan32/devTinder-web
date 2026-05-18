import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/login";
import Profile from "./components/profile";
import Body from "./components/body";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
