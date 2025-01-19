import { useContext } from "react";
import { Button, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { TodoContext } from '../contexts/TodoContext';
import TodoCard from '../components/TodoCard';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
    const { todos } = useContext(TodoContext); // Access `todos` directly
    const { token } = useContext(AuthContext); // Access `token` directly
    const navigate = useNavigate();

    function navigateToAdd() {
        if (!token) {
            console.warn("No token found!");
            return;
        }
        console.log(token);
        navigate("/add");
    }

    return (
        <Container>
            <Card className="my-5">
                <Card.Body>
                    <h1 className="mt-5 mb-3 mx-4">To Read List</h1>
                    <h6 className="mx-4">
                        Let's add the book to your reading list and keep track of your progress. Just let me know which chapter and page you're on, and feel free to use the timer to help manage your reading time!
                    </h6>
                    <Button className="my-4 mx-4" variant="outline-dark" onClick={navigateToAdd}>
                        Add Book
                    </Button>
                    <GenreTabs todos={todos} />
                </Card.Body>
            </Card>
        </Container>
    );
}

function FictionIncomplete({ todos }) {
    const fictionalBooks = todos.filter(todo => todo.genre === "fictional" && !todo.completed);

    return fictionalBooks.map((todo) => (
        <Col md={4} key={todo.id}>
            <TodoCard todo={todo} />
        </Col>
    ));
}

function FictionCompleted({ todos }) {
    const fictionalBooks = todos.filter(todo => todo.genre === "fictional" && todo.completed);

    return fictionalBooks.map((todo) => (
        <Col md={4} key={todo.id}>
            <TodoCard todo={todo} />
        </Col>
    ));
}

function NonFictionIncomplete({ todos }) {
    const nonFictionalBooks = todos.filter(todo => todo.genre === "non-fictional" && !todo.completed);

    return nonFictionalBooks.map((todo) => (
        <Col md={4} key={todo.id}>
            <TodoCard todo={todo} />
        </Col>
    ));
}

function NonFictionComplete({ todos }) {
    const nonFictionalBooks = todos.filter(todo => todo.genre === "non-fictional" && todo.completed);

    return nonFictionalBooks.map((todo) => (
        <Col md={4} key={todo.id}>
            <TodoCard todo={todo} />
        </Col>
    ));
}

function GenreTabs({ todos }) {
    return (
        <Tabs defaultActiveKey="fictional" id="uncontrolled-tab-example" className="mb-4 mx-4">
            <Tab eventKey="fictional" title="Fictional">
                <Row className="mx-3">
                    <FictionIncomplete todos={todos} />
                </Row>
                <Row className="mx-3">
                    <FictionCompleted todos={todos} />
                </Row>
            </Tab>

            <Tab eventKey="non-fictional" title="Non-Fictional">
                <Row className="mx-3">
                    <NonFictionIncomplete todos={todos} />
                </Row>
                <Row className="mx-3">
                    <NonFictionComplete todos={todos} />
                </Row>
            </Tab>
        </Tabs>
    );
}
