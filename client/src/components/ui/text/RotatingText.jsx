    import React, { useState, useRef, useEffect } from 'react';

    function RotatingText({ text }) {
        const [rotation, setRotation] = useState(0);
        const animationRef = useRef(null);

        useEffect(() => {
            const animate = () => {
                setRotation((prevRotation) => prevRotation + 1);
                animationRef.current = requestAnimationFrame(animate);
            };

            animationRef.current = requestAnimationFrame(animate);

            return () => cancelAnimationFrame(animationRef.current);
        }, []);

        return (
            <span style={{ transform: `rotate(${rotation}deg)`, display: 'inline-block' }}>
                {text}
            </span>
        );
    }

    export default RotatingText;