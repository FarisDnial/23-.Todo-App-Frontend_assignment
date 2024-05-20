import { useContext } from "react";
import { useState } from "react";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

export default function AddTodo() {
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate = useNavigate();
    const id = parseInt(useParams().id);
    const currentTodo = todos.filter((todo) => todo.id === id)[0];
    const [title, setTitle] = useState(currentTodo.title);
    const [genre, setGenre] = useState(currentTodo.genre);
    const [pages, setPages] = useState(currentTodo.pages);
    const [chapter, setChapter] = useState(currentTodo.chapter);
    const [completed, setCompleted] = useState(currentTodo.completed);

    function updateTodo(event) {
        event.preventDefault();
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { id, title, genre, chapter, pages, completed }
            }
            return todo;
        });
        setTodos(updatedTodos);
        navigate("/dashboard")
    }

    return (
        <Container>
            <Card className="mx-5 my-5">
                <Card.Body>
                    <h1 className="my-3">Update Todo</h1>
                    <Form onSubmit={updateTodo}>
                        <Row className="mb-2">
                            <Form.Group as={Col} className="mb-3" controlId="title">
                                <Form.Label>Book Title</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="Get Software developer job"
                                    required
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="genre">
                                <Form.Label>Book Genre</Form.Label>
                                <Form.Select
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    required
                                >
                                    <option value="">Select Genre</option>
                                    <option value="fictional">Fictional</option>
                                    <option value="non-fictional">Non-Fictional</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-2">
                            <Form.Group as={Col} className="mb-3" controlId="chapter">
                                <Form.Label>Chapter</Form.Label>
                                <Form.Control
                                    value={chapter}
                                    onChange={(e) => setChapter(e.target.value)}
                                    type="text"
                                    placeholder="Chapter 4"

                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="pages">
                                <Form.Label>Pages</Form.Label>
                                <Form.Control
                                    value={pages}
                                    onChange={(e) => setPages(e.target.value)}
                                    type="text"
                                    placeholder="page 120"

                                />
                            </Form.Group>
                        </Row>

                        <Form.Check
                            type="checkbox"
                            id="completed"
                            label="Mark as completed"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="mb-3"
                        />
                        <Button variant="outline-dark" type="submit">
                            Submit
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}