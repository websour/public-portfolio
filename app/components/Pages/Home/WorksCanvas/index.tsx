import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const CanvasComponent = styled.canvas`
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 0;
    translate: -50%;
`;

interface WorksCanvasProps {
    width: number;
    height: number;
}

interface Square {
    x: number;
    y: number;
    size: number;
    color: string;
    moving: boolean;
    dx: number;
    dy: number;
}

const WorksCanvas: React.FC<WorksCanvasProps> = (props): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const initializeDirection = (square: Square) => {
            const directions = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            const [dx, dy] = directions[Math.floor(Math.random() * directions.length)];
            square.dx = dx;
            square.dy = dy;
        }

        const squares: Square[] = [
            { x: 142, y: 25, size: 16, color: '#61DAFB', moving: false, dx: 0, dy: 0 },
            { x: 960, y: 15, size: 16, color: '#FFF', moving: false, dx: 0, dy: 0 },
            { x: 110, y: 350, size: 16, color: '#FFF', moving: false, dx: 0, dy: 0 },
            { x: 960, y: 350, size: 16, color: '#61DAFB', moving: false, dx: 0, dy: 0 },
        ];

        squares.forEach(initializeDirection);

        const drawSquare = (square: Square) => {
            ctx.fillStyle = square.color;
            ctx.fillRect(square.x, square.y, square.size, square.size);
        }

        const updateSquares = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            squares.forEach(square => {
                if (square.moving) {
                    square.x += square.dx;
                    square.y += square.dy;

                    if (square.x >= canvas.width - square.size || square.x <= 0) square.dx = -square.dx;
                    if (square.y >= canvas.height - square.size || square.y <= 0) square.dy = -square.dy;
                }
                drawSquare(square);
            });
            requestAnimationFrame(updateSquares);
        }

        // 移動と停止を交互に切り替える
        const toggleMovement = () => squares.forEach(square => square.moving = !square.moving);


        // 移動と停止を交互に切り替える
        let moving = true;
        const interval = 4000;
        const toggleMovementInterval = () => {
            toggleMovement();
            moving = !moving;
            setTimeout(toggleMovementInterval, moving ? 6000 : 1000);
        }

        // 初回
        setTimeout(toggleMovementInterval, interval);

        requestAnimationFrame(updateSquares);
    }, []);

    return <CanvasComponent ref={canvasRef} {...props} />;
}

export default WorksCanvas;
