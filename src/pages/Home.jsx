import { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../App.css";

export default function Home() {
    const navigate = useNavigate();
    const authcontext = useContext(AuthContext);

    function navigateToLogin() {
        authcontext.setToken(null);
        navigate("/login")
    }

    return (
        <Container>
            <h1 className="my-5 text-center">Welcome to ReadTrack !</h1>
            <p>Embark on your reading journey with us. Whether you're diving into a captivating novel, delving into an insightful non-fiction book, or exploring the pages of your favorite genres, our platform is here to accompany you every step of the way.             Track your reading progress, set timers to stay focused, and manage your bookshelf seamlessly. Discover new reads, set reading goals, and immerse yourself in the world of literature like never before.
            </p>
            <Button className="my-5 d-block mx-auto" variant="warning" onClick={navigateToLogin}>Login</Button>
        </Container>
    );
}
