import { useContext, useState } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../App.css";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    function login() {
        const isCorrectUsername1 = (username === "faris.danial@gmail.com");
        const isCorrectPassword1 = (password === "abc123");
        const isCorrectUsername2 = (username === "user@mail.com");
        const isCorrectPassword2 = (password === "abc123");
        // if both of these are true, continue
        if (isCorrectUsername1 && isCorrectPassword1) {
            authContext.setToken("1234");
            navigate("/dashboard");
        } else if (isCorrectUsername2 && isCorrectPassword2) {
            authContext.setToken("4321");
            navigate("/dashboard");
        }
    }

    return (
        <>

            <Container>
                <Card className="mx-5 my-5">
                    <Card.Body>
                        <h1 className="my-3 mx-5">Login to your account</h1>
                        <Form>

                            <Form.Group className="mx-5" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={username} onChange={(e) => setUsername(e.target.value)} />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mx-5" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Group>

                            <Button className="my-3 mx-5" variant="warning" onClick={login}>
                                Login
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>

            </Container>
        </>
    );
}