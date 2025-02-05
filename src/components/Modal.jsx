import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../feature/bookSlice';
import { useNavigate } from 'react-router-dom';

export default function DeleteTodo({ book }) {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleCloseDelete = () => {
        setShow(false);
        dispatch(deleteBook(book));  // Dispatching deleteBook action to remove the book
        navigate("/dashboard");  // Navigate back to the dashboard
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
                <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
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
