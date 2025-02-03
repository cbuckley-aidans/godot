// js/color-changing-simulation.js

function renderSimulation(containerId) {
    const ColorChangingSimulations = () => {
        const [readyColor, setReadyColor] = React.useState('#ff0000');
        const [processColor, setProcessColor] = React.useState('#ff0000');
        const [speed, setSpeed] = React.useState(1);

        React.useEffect(() => {
            // Simulate _ready() function
            setReadyColor('#00ff00');

            // Simulate _process() function
            let green = 0;
            const processInterval = setInterval(() => {
                green = (green + 5 * speed) % 256;
                setProcessColor(`rgb(255, ${green}, 0)`);
            }, 50);

            return () => clearInterval(processInterval);
        }, [speed]);

        return React.createElement('div', { className: "flex flex-col md:flex-row gap-4" },
            React.createElement('div', { className: "flex-1 bg-gray-700 p-4 rounded-lg" },
                React.createElement('h3', { className: "text-lg font-semibold mb-2" }, "_ready() Simulation"),
                React.createElement('div', { 
                    className: "w-full h-32 rounded-lg mb-2",
                    style: { backgroundColor: readyColor }
                }),
                React.createElement('p', {}, "Color changes immediately when the node enters the scene.")
            ),
            React.createElement('div', { className: "flex-1 bg-gray-700 p-4 rounded-lg" },
                React.createElement('h3', { className: "text-lg font-semibold mb-2" }, "_process() Simulation"),
                React.createElement('div', { 
                    className: "w-full h-32 rounded-lg mb-2",
                    style: { backgroundColor: processColor }
                }),
                React.createElement('p', {}, "Color changes gradually over time."),
                React.createElement('input', {
                    type: "range",
                    min: "0.1",
                    max: "2",
                    step: "0.1",
                    value: speed,
                    onChange: (e) => setSpeed(parseFloat(e.target.value)),
                    className: "w-full mt-2"
                }),
                React.createElement('p', {}, `Adjust speed: ${speed.toFixed(1)}x`)
            )
        );
    };

    ReactDOM.render(React.createElement(ColorChangingSimulations), document.getElementById(containerId));
}

window.renderSimulation = renderSimulation;