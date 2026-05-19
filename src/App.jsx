import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/login";
import Profile from "./components/profile";
import Body from "./components/body";
import { Provider } from "react-redux";
import store from "./store/app-store";
import Feed from "./components/feed";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
