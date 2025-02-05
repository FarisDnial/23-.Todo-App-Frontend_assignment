import { useContext } from "react";
import { Button, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import TodoCard from "../components/TodoCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const books = useSelector((state) => state.book); // Corrected state selection
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    function navigateToAdd() {
        if (!token) {
            console.warn("No token found! Access Denied.");
            return;
        }
        navigate("/add");
    }

    return (
        <Container style={{ width: '100rem' }}>
            <Card className="my-5">
                <Card.Body>
                    <h1 className="mt-5 mb-3 mx-4">To Read List</h1>
                    <h6 className="mx-4">
                        Let's add the book to your reading list and keep track of your progress.
                        Just let me know which chapter and page you're on, and feel free to use the timer to help manage your reading time!
                    </h6>
                    <Button className="my-4 mx-4" variant="warning" onClick={navigateToAdd}>
                        Add Book
                    </Button>
                    <GenreTabs books={books} />
                </Card.Body>
            </Card>
        </Container>
    );
}

function GenreTabs({ books }) {
    const fictionIncomplete = books.filter(book => book.genre === "fictional" && !book.completed);
    const fictionCompleted = books.filter(book => book.genre === "fictional" && book.completed);
    const nonFictionIncomplete = books.filter(book => book.genre === "non-fictional" && !book.completed);
    const nonFictionCompleted = books.filter(book => book.genre === "non-fictional" && book.completed);

    return (
        <Tabs defaultActiveKey="fictional" id="uncontrolled-tab-example" className="mb-4 mx-4">
            <Tab eventKey="fictional" title="Fictional">
                <Row className="mx-3">
                    {/* <h5><Badge style={{ color: "white", outline: "black" }} bg="success" >Completed = 3</Badge></h5> */}
                    {fictionIncomplete.map(book => <BookCard key={book.id} book={book} />)}
                </Row>
                <Row className="mx-3">
                    {fictionCompleted.map(book => <BookCard key={book.id} book={book} />)}
                </Row>
            </Tab>
            <Tab eventKey="non-fictional" title="Non-Fictional">
                <Row className="mx-3">
                    {nonFictionIncomplete.map(book => <BookCard key={book.id} book={book} />)}
                </Row>
                <Row className="mx-3">
                    {nonFictionCompleted.map(book => <BookCard key={book.id} book={book} />)}
                </Row>
            </Tab>
        </Tabs>
    );
}

function BookCard({ book }) {
    return (
        <Col lg={6}>
            <TodoCard key={book.id} book={book} />
        </Col>
    );
}
