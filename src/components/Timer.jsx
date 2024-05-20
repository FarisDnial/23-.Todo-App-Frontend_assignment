import { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

function Timer({ initialDuration, onTimerComplete }) {
    const [count, setCount] = useState(initialDuration);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCount((prevCount) => {
                if (prevCount === 0) {
                    clearInterval(intervalId);
                    onTimerComplete(); // Call the callback function when the timer is complete
                    return 0;
                }
                return prevCount - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [initialDuration, onTimerComplete]);

    return (
        <>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">Timer</InputGroup.Text>
                <Form.Control
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    type="text"
                    value={formatTime(count)}
                    disabled
                />
            </InputGroup>
        </>
    )
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

function pad(value) {
    return value < 10 ? `0${value}` : value;
}

export default function App() {
    const [showTimer, setShowTimer] = useState(false);
    const [timerInput, setTimerInput] = useState('00:10:00'); // Default timer duration set to 10 minutes

    const toggleTimer = () => setShowTimer(!showTimer);

    const handleStartTimer = () => {
        const [hours, minutes, seconds] = timerInput.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds;
        setShowTimer(true);
        setTimerInput(formatTime(totalSeconds));
    };

    const handleTimerComplete = () => {
        alert('Timer is up!'); // Display an alert message when the timer is complete
    };

    return (
        <div>
            {!showTimer && (
                <div>
                    <InputGroup size="sm" className="mb-3">
                        <InputGroup.Text id="inputGroup-sizing-sm">Set Timer</InputGroup.Text>
                        <Form.Control
                            aria-label="Small"
                            aria-describedby="inputGroup-sizing-sm"
                            type="text"
                            value={timerInput}
                            onChange={(e) => setTimerInput(e.target.value)}
                        />
                        <Button size="sm" className="mx-2" onClick={handleStartTimer}>Start</Button>
                    </InputGroup>
                </div>
            )}
            {showTimer && (
                <div>
                    <Timer initialDuration={timeToSeconds(timerInput)} onTimerComplete={handleTimerComplete} />
                    <Button size="sm" className="mb-3" onClick={toggleTimer}>Stop</Button>
                </div>
            )}
        </div>
    );
}

function timeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

