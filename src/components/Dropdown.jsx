import Dropdown from 'react-bootstrap/Dropdown';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function BasicExample() {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    function logout() {
        authContext.setToken(null);
        navigate("/Login")
    }
    return (
        <Dropdown>
            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                <i className="bi bi-person-lines-fill"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="/">Home</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}