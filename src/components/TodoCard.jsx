import { Badge, Button, Card } from "react-bootstrap";
import DeleteTodo from "./Modal";
import Timer from "./Timer";

export default function TodoCard({ book }) {
    const completed = book.completed;
    const border = completed ? 'success' : 'danger';
    const bg = completed ? 'success' : 'danger';

    return (
        <Card border={border} className="my-3">
            <Card.Header>
                <h5 className="my-1">
                    <Badge bg={bg}>{!completed && 'Not'} Completed</Badge>
                </h5>
            </Card.Header>
            <Card.Body>
                <h3>
                    <Badge style={{ color: "black", outline: "black" }} bg="light">{book.title}</Badge>
                </h3>
                <h5 className="my-3">
                    <Badge style={{ color: "black", outline: "black" }} bg="light">Chapter: {book.chapter}</Badge>
                    <Badge className="mx-2" style={{ color: "black" }} bg="light">Pages: {book.pages}</Badge>
                </h5>
                {!completed && (<Timer />)}
                <Button variant="dark" href={`todo/${book.id}`} >
                    <i className="bi bi-pencil"></i>
                </Button>
                <DeleteTodo book={book} />
            </Card.Body>
        </Card>
    );
}
