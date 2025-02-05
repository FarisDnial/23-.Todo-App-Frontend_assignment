import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addBook } from "../feature/bookSlice";
import '../App.css';

export default function AddTodo() {
    const books = useSelector((state) => (state.book))
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [pages, setPages] = useState("");
    const [chapter, setChapter] = useState("");
    const [completed, setCompleted] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function addToBookList(event) {
        event.preventDefault();

        const newBook = {
            id: Date.now(),
            title,
            genre,
            chapter: parseInt(chapter) || 0, // Ensure it's a number
            pages: parseInt(pages) || 0, // Ensure it's a number
            completed,
        };

        dispatch(addBook(newBook)); // Dispatch a single book object
        console.log(books)
        navigate("/dashboard");
    }

    function navigatoToDashboard() {
        navigate("/dashboard")
    }

    return (
        <Container>
            <Card className="my-5">
                <Card.Body className="mx-5 my-5">
                    <h1 className="mb-5">Book To Read</h1>
                    <Form onSubmit={addToBookList}>
                        <Row className="mb-2">
                            <Form.Group as={Col} className="mb-3" controlId="title">
                                <Form.Label>Book Title</Form.Label>
                                <Form.Control
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    type="text"
                                    placeholder="Harry Potter and the Sorcerer's Stone"
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
                                    type="number"
                                    placeholder="Chapter 4"
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="pages">
                                <Form.Label>Pages</Form.Label>
                                <Form.Control
                                    value={pages}
                                    onChange={(e) => setPages(e.target.value)}
                                    type="number"
                                    placeholder="Page 120"
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
                        <Button variant="dark" className="my-2" onClick={navigatoToDashboard}>
                            Back
                        </Button>
                        <Button variant="warning" type="submit" className="mx-2">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
