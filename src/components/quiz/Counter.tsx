import React, { useState, useEffect } from 'react';

interface CounterProps {
    initialMinutes: number;
    initialSeconds?: number;
    action: () => void;
}

const Counter: React.FC<CounterProps> = ({ initialMinutes, initialSeconds = 0, action }) => {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds((prevSeconds) => prevSeconds - 1);
            } else if (minutes > 0) {
                setMinutes((prevMinutes) => prevMinutes - 1);
                setSeconds(59);
            } else {
                clearInterval(timer);
                action();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes, seconds, action]);

    const textColor = minutes <= 5 ? 'red' : 'white';

    return (
        <div style={{ color: textColor }} className='font-extrabold text-2xl bg-slate-600 rounded-lg shadow-lg px-3 flex items-center'>
            
            {textColor === "red" && <span className='text-sm font-normal mr-2'>Will get auto submit in</span>}
            <span style={{width:"70px"}}>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')} </span>
            
        </div>
    );
};

export default Counter;
