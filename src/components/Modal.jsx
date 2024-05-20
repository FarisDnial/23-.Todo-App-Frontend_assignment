import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TodoContext } from "../contexts/TodoContext"
import { useNavigate } from 'react-router-dom';


export default function DeleteTodo({ todo }) {
    const [show, setShow] = useState(false);
    const setTodos = useContext(TodoContext).setTodos;
    const navigate = useNavigate();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleCloseDelete = () => {
        setShow(false);
        setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todo.id));
        navigate("/dashboard")

    }

    return (
        <>
            <Button variant="danger" onClick={handleShow} className="ms-2">
                <i className="bi bi-trash3"></i>
            </Button>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleCloseDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}