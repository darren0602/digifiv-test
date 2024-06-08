import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginScreen from "./features/auth/screens/login.screen";
import { setUsers } from "./features/user/components/userSlice";
import UserCreateScreen from "./features/user/screens/user-create.screen";
import UserListScreen from "./features/user/screens/user-list.screen";
import CustomMenu from "./infratsructure/layout/menu.layout";

const initialUsers = [
  { id: 1, name: "Tim", email: "tim@mail.com" },
  { id: 2, name: "John", email: "john@mail.com" },
  { id: 3, name: "Sarah", email: "sarah@mail.com" },
  { id: 4, name: "Jessica", email: "jessica@mail.com" },
  { id: 5, name: "Michael", email: "michael@mail.com" },
  { id: 6, name: "Emily", email: "emily@mail.com" },
  { id: 7, name: "David", email: "david@mail.com" },
  { id: 8, name: "Emma", email: "emma@mail.com" },
  { id: 9, name: "James", email: "james@mail.com" },
  { id: 10, name: "Sophia", email: "sophia@mail.com" },
  { id: 11, name: "Robert", email: "robert@mail.com" },
  { id: 12, name: "Isabella", email: "isabella@mail.com" },
  { id: 13, name: "Thomas", email: "thomas@mail.com" },
  { id: 14, name: "Olivia", email: "olivia@mail.com" },
  { id: 15, name: "Mark", email: "mark@mail.com" },
  { id: 16, name: "Ava", email: "ava@mail.com" },
  { id: 17, name: "Paul", email: "paul@mail.com" },
  { id: 18, name: "Mia", email: "mia@mail.com" },
  { id: 19, name: "Daniel", email: "daniel@mail.com" },
  { id: 20, name: "Liam", email: "liam@mail.com" },
];

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const usersFromLocalStorage = localStorage.getItem("users");
    if (!usersFromLocalStorage) {
      localStorage.setItem("users", JSON.stringify(initialUsers));
      dispatch(setUsers(initialUsers));
    } else {
      dispatch(setUsers(JSON.parse(usersFromLocalStorage)));
    }
  }, [dispatch]);

  return (
    <Router basename="/digifiv-test">
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route element={<CustomMenu />}>
          <Route path="/users/list" element={<UserListScreen />} />
          <Route path="/users/new" element={<UserCreateScreen />} />
          <Route path="/logout" element={<div>Logout</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
