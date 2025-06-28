import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login';
import UserList from "./pages/userList"
import ProtectRoute from "./Components/ProtectRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="userlist" element={
          <ProtectRoute>
            <UserList />
          </ProtectRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
