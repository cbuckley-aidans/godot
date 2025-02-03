// js/tutorial-3-simulations.js

function renderSimulation(containerId) {
    if (containerId === 'interactive-demo') {
        renderInteractiveDemo(containerId);
    } else if (containerId === 'signal-diagram') {
        renderSignalDiagram(containerId);
    } else if (containerId === 'dollar-sign-demo') {
        renderDollarSignDemo(containerId);
    }
}

function renderInteractiveDemo(containerId) {
    const InteractiveDemo = () => {
        const [count, setCount] = React.useState(0);
        const maxCount = 10;

        const handleClick = () => {
            if (count < maxCount) {
                setCount(count + 1);
            }
        };

        return React.createElement('div', { className: "bg-gray-700 p-4 rounded-lg shadow-lg" },
            React.createElement('div', { className: "flex flex-col items-center space-y-4" },
                React.createElement('div', { className: "text-2xl font-bold text-white" }, count),
                React.createElement('button', {
                    onClick: handleClick,
                    disabled: count >= maxCount,
                    className: `px-4 py-2 rounded ${count >= maxCount ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold transition-colors duration-200`
                }, "Click Me!"),
                React.createElement('div', { className: "w-full bg-gray-600 rounded-full h-2.5" },
                    React.createElement('div', {
                        className: "bg-blue-500 h-2.5 rounded-full transition-all duration-200",
                        style: { width: `${(count / maxCount) * 100}%` }
                    })
                )
            )
        );
    };

    ReactDOM.render(React.createElement(InteractiveDemo), document.getElementById(containerId));
}

function renderSignalDiagram(containerId) {
    const SignalDiagram = () => {
        const [animationRunning, setAnimationRunning] = React.useState(false);

        const runAnimation = React.useCallback(() => {
            if (animationRunning) return;

            setAnimationRunning(true);
            const timeline = anime.timeline({
                easing: 'easeInOutSine',
                complete: () => setAnimationRunning(false)
            });

            timeline
                // Reset all elements
                .add({
                    targets: ['#signal-path', '#update-path'],
                    opacity: 0,
                    duration: 0
                })
                .add({
                    targets: ['#button-node rect', '#main-node rect', '#label-node rect'],
                    fill: '#6B7280',
                    duration: 0
                })
                // Button lights up
                .add({
                    targets: '#button-node rect',
                    fill: '#EF4444',
                    duration: 600
                })
                // Signal travels to Main
                .add({
                    targets: '#signal-path',
                    opacity: 1,
                    strokeDashoffset: [anime.setDashoffset, 0],
                    duration: 1000
                })
                // Main lights up
                .add({
                    targets: '#main-node rect',
                    fill: '#4CAF50',
                    duration: 600
                }, '-=200')
                // Signal fades
                .add({
                    targets: '#signal-path',
                    opacity: 0,
                    duration: 500
                })
                // Update signal travels to Label
                .add({
                    targets: '#update-path',
                    opacity: 1,
                    strokeDashoffset: [anime.setDashoffset, 0],
                    duration: 1000
                })
                // Label lights up
                .add({
                    targets: '#label-node rect',
                    fill: '#2196F3',
                    duration: 600
                }, '-=200')
                // Update signal fades
                .add({
                    targets: '#update-path',
                    opacity: 0,
                    duration: 500
                })
                // All nodes return to original color
                .add({
                    targets: ['#button-node rect', '#main-node rect', '#label-node rect'],
                    fill: '#6B7280',
                    duration: 800,
                    delay: anime.stagger(200)
                });
        }, [animationRunning]);

        return React.createElement('div', { className: 'flex flex-col items-center' },
            React.createElement('svg', { 
                viewBox: '0 0 400 200', 
                className: 'w-full h-auto mb-4'
            },
                React.createElement('rect', { width: 400, height: 200, rx: 10, fill: '#1F2937' }),
                React.createElement('g', { 
                    fill: 'none', 
                    stroke: '#4DC498', 
                    strokeWidth: 2, 
                    strokeLinecap: 'round', 
                    strokeLinejoin: 'round' 
                },
                    React.createElement('path', { id: 'button-to-main', d: 'M 50 50 H 200', strokeDasharray: '5 5' }),
                    React.createElement('path', { id: 'main-to-label', d: 'M 200 50 V 150 H 350', strokeDasharray: '5 5' }),
                    React.createElement('path', { id: 'signal-path', d: 'M 50 50 H 200', stroke: '#FFD700', strokeWidth: 3, opacity: 0 }),
                    React.createElement('path', { id: 'update-path', d: 'M 200 50 V 150 H 350', stroke: '#4299E1', strokeWidth: 3, opacity: 0 })
                ),
                React.createElement('g', { id: 'button-node', transform: 'translate(20, 30)' },
                    React.createElement('rect', { width: 60, height: 40, rx: 5, fill: '#6B7280' }),
                    React.createElement('text', { x: 30, y: 25, textAnchor: 'middle', fill: 'white', fontSize: 12 }, 'Button')
                ),
                React.createElement('g', { id: 'main-node', transform: 'translate(170, 30)' },
                    React.createElement('rect', { width: 60, height: 40, rx: 5, fill: '#6B7280' }),
                    React.createElement('text', { x: 30, y: 25, textAnchor: 'middle', fill: 'white', fontSize: 12 }, 'Main')
                ),
                React.createElement('g', { id: 'label-node', transform: 'translate(320, 130)' },
                    React.createElement('rect', { width: 60, height: 40, rx: 5, fill: '#6B7280' }),
                    React.createElement('text', { x: 30, y: 25, textAnchor: 'middle', fill: 'white', fontSize: 12 }, 'Label')
                )
            ),
            React.createElement('button', {
                onClick: runAnimation,
                disabled: animationRunning,
                className: 'bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            }, 'Send Signal')
        );
    };

    ReactDOM.render(React.createElement(SignalDiagram), document.getElementById(containerId));
}

function renderDollarSignDemo(containerId) {
    const DollarSignDemo = () => {
        const [step, setStep] = React.useState(0);
        const [labelText, setLabelText] = React.useState("Hello");

        const nextStep = () => {
            setStep(prevStep => (prevStep + 1) % 3);
        };

        const updateLabelText = () => {
            setLabelText(prevText => prevText === "Hello" ? "World" : "Hello");
        };

        const renderNode = (name, x, y, width, height, highlighted) => {
            return React.createElement('g', { transform: `translate(${x}, ${y})` },
                React.createElement('rect', {
                    width: width,
                    height: height,
                    rx: 5,
                    fill: highlighted ? '#4CAF50' : '#6B7280',
                    stroke: highlighted ? '#FFF' : 'none',
                    strokeWidth: 2
                }),
                React.createElement('text', {
                    x: width / 2,
                    y: height / 2 + 5,
                    textAnchor: 'middle',
                    fill: 'white',
                    fontSize: 14
                }, name)
            );
        };

        const renderArrow = (start, end) => {
            return React.createElement('path', {
                d: `M ${start.x} ${start.y} L ${end.x} ${end.y}`,
                stroke: '#FFF',
                strokeWidth: 2,
                markerEnd: 'url(#arrowhead)'
            });
        };

        return React.createElement('div', { className: "bg-gray-800 p-4 rounded-lg" },
            React.createElement('svg', { viewBox: '0 0 400 250', className: 'w-full h-64 mb-4' },
                // Main node
                renderNode('Main', 150, 20, 100, 40, step === 0),
                // Label node
                renderNode('Label', 150, 100, 100, 40, step === 1),
                // Text property
                renderNode(`text: "${labelText}"`, 150, 180, 100, 40, step === 2),
                // Arrows
                renderArrow({x: 200, y: 60}, {x: 200, y: 100}),
                renderArrow({x: 200, y: 140}, {x: 200, y: 180}),
                // Arrowhead definition
                React.createElement('defs', null,
                    React.createElement('marker', {
                        id: 'arrowhead',
                        markerWidth: 10,
                        markerHeight: 7,
                        refX: 0,
                        refY: 3.5,
                        orient: 'auto'
                    },
                    React.createElement('polygon', {
                        points: '0 0, 10 3.5, 0 7',
                        fill: '#FFF'
                    })
                    )
                )
            ),
            React.createElement('div', { className: "bg-gray-700 p-2 rounded mb-4" },
                React.createElement('code', { className: "text-white" }, 
                    React.createElement('span', {
                        style: { color: step === 0 ? '#4CAF50' : 'white' }
                    }, '$'),
                    React.createElement('span', {
                        style: { color: step === 1 ? '#4CAF50' : 'white' }
                    }, 'Label'),
                    React.createElement('span', {
                        style: { color: step === 2 ? '#4CAF50' : 'white' }
                    }, '.text'),
                    ' = "',
                    labelText,
                    '"'
                )
            ),
            React.createElement('button', {
                onClick: nextStep,
                className: "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            }, "Next Step"),
            React.createElement('button', {
                onClick: updateLabelText,
                className: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            }, "Update Label Text"),
            React.createElement('p', { className: "text-white mt-2" }, [
                step === 0 && "The $ symbol accesses child nodes from the current node (Main).",
                step === 1 && "Label is a child node of Main, accessed using $Label.",
                step === 2 && ".text is a property of the Label node, allowing us to set its text content."
            ][step])
        );
    };

    ReactDOM.render(React.createElement(DollarSignDemo), document.getElementById(containerId));
}

window.renderSimulation = renderSimulation;