// js/vector2-simulation.js

function renderSimulation(containerId) {
    const Vector2Demo = () => {
        const [x, setX] = React.useState(50);
        const [y, setY] = React.useState(50);

        const updatePosition = (newX, newY) => {
            setX(newX);
            setY(newY);
        };

        return React.createElement('div', { className: "bg-gray-700 p-4 rounded-lg" },
            React.createElement('h3', { className: "text-lg font-semibold mb-2" }, "Interactive Vector2 Demo"),
            React.createElement('p', { className: "mb-4" }, "Play around with this simulation to visualise what a Vector2 is."),
            React.createElement('div', { className: "relative w-full h-64 bg-gray-800 mb-4" },
                React.createElement('div', {
                    className: "absolute w-4 h-4 bg-blue-500 rounded-full",
                    style: { left: `${x}%`, top: `${y}%` }
                })
            ),
            React.createElement('div', { className: "flex space-x-4" },
                React.createElement('div', null,
                    React.createElement('label', { className: "block mb-2" }, `X: ${x}`),
                    React.createElement('input', {
                        type: "range",
                        min: "0",
                        max: "100",
                        value: x,
                        className: "w-full",
                        onChange: (e) => updatePosition(parseInt(e.target.value), y)
                    })
                ),
                React.createElement('div', null,
                    React.createElement('label', { className: "block mb-2" }, `Y: ${y}`),
                    React.createElement('input', {
                        type: "range",
                        min: "0",
                        max: "100",
                        value: y,
                        className: "w-full",
                        onChange: (e) => updatePosition(x, parseInt(e.target.value))
                    })
                )
            ),
            React.createElement('p', { className: "mt-4" }, `Vector2(${x}, ${y})`)
        );
    };

    ReactDOM.render(React.createElement(Vector2Demo), document.getElementById(containerId));
}

window.renderSimulation = renderSimulation;