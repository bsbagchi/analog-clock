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
    const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30 - 90; // 30 degrees per hour
    const minuteAngle = minutes * 6 - 90; // 6 degrees per minute
    const secondAngle = seconds * 6 - 90; // 6 degrees per second

    // Generate hour markers
    const hourMarkers = Array.from({ length: 12 }, (_, i) => i + 1);

    return (
        <div className='flex justify-center items-center'>
            <div style={{
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
                    width: '12px',
                    height: '12px',
                    backgroundColor: 'black',
                    borderRadius: '50%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                }} />

                {/* Hour Markers */}
                {hourMarkers.map((marker) => {
                    const angle = (marker * 30) - 90; // 30 degrees per hour
                    const radius = 80; // Radius for positioning markers
                    const x = radius * Math.cos((angle * Math.PI) / 180); // X position
                    const y = radius * Math.sin((angle * Math.PI) / 180); // Y position
                    return (
                        <div key={marker} style={{
                            position: 'absolute',
                            top: '45%',
                            left: '47%',
                            transform: `translate(${x}px, ${y}px)`,
                            transformOrigin: '0% 0%',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            lineHeight: '1.2',
                            
                        }}>
                            {marker}
                        </div>
                    );
                })}

                {/* Hour Hand */}
                <div style={{
                    position: 'absolute',
                    width: '35%',
                    height: '4px',
                    backgroundColor: 'black',
                    transform: `rotate(${hourAngle}deg)`,
                    transformOrigin: '0% 50%', // Set origin to the left end
                    top: '50%',
                    left: '50%',
                    zIndex: 5,
                }} />
                
                {/* Minute Hand */}
                <div style={{
                    position: 'absolute',
                    width: '40%',
                    height: '2px',
                    backgroundColor: 'grey',
                    transform: `rotate(${minuteAngle}deg)`,
                    transformOrigin: '0% 50%', // Set origin to the left end
                    top: '50%',
                    left: '50%',
                    zIndex: 4,
                }} />
                
                {/* Second Hand */}
                <div style={{
                    position: 'absolute',
                    width: '45%',
                    height: '1px',
                    backgroundColor: 'red',
                    transform: `rotate(${secondAngle}deg)`,
                    transformOrigin: '0% 50%', // Set origin to the left end
                    top: '50%',
                    left: '50%',
                    zIndex: 3,
                }} />
            </div>
        </div>
    );
}
