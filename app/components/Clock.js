"use client"
// components/Clock.js
import { useEffect, useState } from 'react';

export default function Clock() {
    const [time, setTime] = useState('00:00:00');

    useEffect(() => {
        const updateClock = async () => {
            const response = await fetch('/api/get-time');
            const data = await response.json();
            setTime(data.time);
        };

        const interval = setInterval(updateClock, 1000);
        updateClock(); // Initial call

        return () => clearInterval(interval);
    }, []);

    const [hours, minutes, seconds] = time.split(':').map(Number);
    
    // Calculate the angles for each hand
    const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30-90; // 30 degrees per hour
    const minuteAngle = minutes * 6-90; // 6 degrees per minute
    const secondAngle = seconds * 6-90; // 6 degrees per second
  
    return (
        <div className=''>        
            <div className='flex justify-center items-center ' style={{
            position: 'relative',
            width: '200px',
            height: '200px',
            border: '5px solid black',
            borderRadius: '50%',
            background: '#f0f0f0',
        }}>
            {/* Center Point for Reference */}
            <div style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                backgroundColor: 'black',
                borderRadius: '50%',
                zIndex: 10,
            }} />

            {/* Hour Hand */}
            <div className=''
                style={{
                    position: 'absolute',
                    width: '35%',
                    height: '4px',
                    backgroundColor: 'black',
                    transform: `rotate(${hourAngle}deg)`,
                    transformOrigin: '0% 50%', // Set origin to the left end
                    top: '50%',
                    left: '50%',
                    zIndex: 5,
                    marginLeft: '0%', // Adjust left margin to center the hand
                }}
            />
            {/* Minute Hand */}
            <div
                style={{
                    position: 'absolute',
                    width: '40%',
                    height: '2px',
                    backgroundColor: 'grey',
                    transform: `rotate(${minuteAngle}deg)`,
                    transformOrigin: '0% 50%', // Set origin to the left end
                    top: '50%',
                    left: '50%',
                    zIndex: 4,
                    marginLeft: '0%', // Adjust left margin to center the hand
                }}
            />
            {/* Second Hand */}
            <div
                style={{
                    position: 'absolute',
                    width: '45%',
                    height: '1px',
                    backgroundColor: 'red',
                    transform: `rotate(${secondAngle}deg)`,
                    transformOrigin: '0% 50%', // Set origin to the left end
                    top: '50%',
                    left: '50%',
                    zIndex: 3,
                    marginLeft: '0%', // Adjust left margin to center the hand
                }}
            />
        </div>
        </div>

    );
}
