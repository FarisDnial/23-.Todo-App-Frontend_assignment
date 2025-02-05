import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../feature/bookSlice";

export default function AddTodo() {
    const books = useSelector((state) => state.book); // Get the books from Redux
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Access the ID from the URL
    const bookId = parseInt(id);

    // State variables for form input
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [pages, setPages] = useState('');
    const [chapter, setChapter] = useState('');
    const [completed, setCompleted] = useState(false);

    // Find the current book by ID
    const currentBook = books ? books.find((book) => book.id === bookId) : null;

    useEffect(() => {
        // Check if currentBook exists and initialize form fields with its data
        if (currentBook) {
            setTitle(currentBook.title);
            setGenre(currentBook.genre);
            setPages(currentBook.pages);
            setChapter(currentBook.chapter);
            setCompleted(currentBook.completed);
        }
    }, [currentBook]); // Only run this effect when currentBook changes

    // Guard clause for if the currentBook is not found or books is empty
    if (!currentBook) {
        return <h1>Book not found.</h1>; // Or redirect elsewhere
    }

    function updateTodo(event) {
        event.preventDefault();

        // Create an updated book object
        const updatedBook = {
            id: bookId,
            title,
            genre,
            chapter,
            pages,
            completed,
        };

        // Dispatch the updateBook action to update the book in Redux state
        dispatch(updateBook(updatedBook));

        // Redirect to the dashboard after the update
        navigate("/dashboard");
    }

    function navigatoToDashboard() {
        navigate("/dashboard")
    }
    return (
        <Container>
            <Card className="my-5">
                <Card.Body className="mx-5 my-5">
                    <h1 className="mb-5">Update Books</h1>
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
                        <Button variant="dark" className="my-2" onClick={navigatoToDashboard}>
                            Back
                        </Button>
                        <Button variant="warning" type="submit" className="mx-2">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
