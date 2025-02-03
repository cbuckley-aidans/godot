// js/platformer-motion-simulation.js

function renderSimulation(containerId) {
    const PlatformerSimulation = () => {
        const [position, setPosition] = React.useState({ x: 140, y: 0 });
        const [velocity, setVelocity] = React.useState({ x: 0, y: 0 });
        const [isJumping, setIsJumping] = React.useState(false);
        const [showVelocity, setShowVelocity] = React.useState(true);
        const [isActive, setIsActive] = React.useState(false);
        const [inputAxis, setInputAxis] = React.useState(0);
        const containerRef = React.useRef(null);

        const speed = 5;
        const gravity = 0.5;
        const jumpStrength = -15;
        const frameWidth = 320;
        const frameHeight = 256;
        const characterSize = 40;

        React.useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const handleKeyDown = (e) => {
                if (!isActive) return;
                if (e.key === 'ArrowLeft') {
                    setVelocity(v => ({ ...v, x: -speed }));
                    setInputAxis(-1);
                }
                if (e.key === 'ArrowRight') {
                    setVelocity(v => ({ ...v, x: speed }));
                    setInputAxis(1);
                }
                if (e.key === ' ' && !isJumping) {
                    e.preventDefault();
                    setVelocity(v => ({ ...v, y: jumpStrength }));
                    setIsJumping(true);
                }
            };

            const handleKeyUp = (e) => {
                if (!isActive) return;
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    setVelocity(v => ({ ...v, x: 0 }));
                    setInputAxis(0);
                }
            };

            container.addEventListener('keydown', handleKeyDown);
            container.addEventListener('keyup', handleKeyUp);

            return () => {
                container.removeEventListener('keydown', handleKeyDown);
                container.removeEventListener('keyup', handleKeyUp);
            };
        }, [isJumping, isActive]);

        React.useEffect(() => {
            if (!isActive) return;
            const gameLoop = setInterval(() => {
                setPosition(p => ({
                    x: Math.max(0, Math.min(p.x + velocity.x, frameWidth - characterSize)),
                    y: Math.max(0, Math.min(p.y + velocity.y, frameHeight - characterSize))
                }));

                setVelocity(v => ({
                    x: v.x,
                    y: position.y < frameHeight - characterSize ? v.y + gravity : 0
                }));

                if (position.y >= frameHeight - characterSize) setIsJumping(false);
            }, 20);

            return () => clearInterval(gameLoop);
        }, [velocity, position, isActive]);

        const handleStart = () => {
            setIsActive(true);
            containerRef.current.focus();
        };

        return React.createElement('div', { 
            ref: containerRef,
            className: 'relative w-80 h-64 bg-gray-800 overflow-hidden rounded-lg border-2 border-blue-500 mx-auto focus:outline-none',
            style: { width: `${frameWidth}px`, height: `${frameHeight}px` },
            tabIndex: 0
        },
            React.createElement('div', {
                className: 'absolute bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold',
                style: { 
                    width: `${characterSize}px`, 
                    height: `${characterSize}px`,
                    bottom: `${frameHeight - position.y - characterSize}px`, 
                    left: `${position.x}px` 
                }
            }, '😀'),
            React.createElement('div', { className: 'absolute bottom-0 left-0 w-full h-1 bg-green-500' }),
            showVelocity && React.createElement('div', { className: 'absolute top-2 left-2 text-xs text-white' },
                `Velocity: (${velocity.x.toFixed(2)}, ${velocity.y.toFixed(2)})`
            ),
            React.createElement('div', { className: 'absolute top-6 left-2 text-xs text-white' },
                `Input Axis: ${inputAxis.toFixed(2)}`
            ),
            React.createElement('button', {
                className: 'absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs',
                onClick: () => setShowVelocity(!showVelocity)
            }, showVelocity ? 'Hide Velocity' : 'Show Velocity'),
            React.createElement('div', { className: 'absolute bottom-2 left-2 text-xs text-white' }, 'Use ← → to move, Space to jump'),
            !isActive && React.createElement('button', {
                className: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded',
                onClick: handleStart
            }, 'Click me to start')
        );
    };

    ReactDOM.render(React.createElement(PlatformerSimulation), document.getElementById(containerId));
}

window.renderSimulation = renderSimulation;