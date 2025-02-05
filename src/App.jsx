import useLocalStorage from "use-local-storage";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import EditTodo from "./pages/EditTodo";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Dropdown from "./components/Dropdown";
import { AuthContext } from "./contexts/AuthContext";

function Layout() {
    return (
        <>
            <Navbar expand="lg" bg="dark" variant="dark" className="custom-navbar">
                <Container>
                    <Navbar.Brand href="/" className="navbar-brand">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="/dashboard" className="navbar-link">Dashboard</Nav.Link> */}
                        </Nav>
                        <Dropdown />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default function App() {
    const [token, setToken] = useLocalStorage("token", null);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route
                            path="dashboard"
                            element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            } />
                        <Route
                            path="add"
                            element={
                                <RequireAuth>
                                    <AddTodo />
                                </RequireAuth>
                            } />
                        <Route
                            path="todo/:id"
                            element={
                                <RequireAuth>
                                    <EditTodo />
                                </RequireAuth>
                            } />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>

    );
}
