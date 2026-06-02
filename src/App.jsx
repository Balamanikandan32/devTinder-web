import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/login";
import Profile from "./components/profile";
import Body from "./components/body";
import { Provider } from "react-redux";
import store from "./store/app-store";
import Feed from "./components/feed";
import Connections from "./components/connections";
import Requests from "./components/requests";
import SignUp from "./components/signup";
import Premium from "./components/premium";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/premium" element={<Premium />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
