import React, { useRef, useEffect } from 'react';
import { Cube } from '../../../../types/Cube';

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

const HeroCanvas: React.FC<CanvasProps> = (props): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const colors = [
      'rgba(255, 255, 255, 1)',
      '#98FF98',
      '#FFD1DC',
    ];
    const cubeSize = 18;
    const startY = height / 2 - cubeSize * 3;
    const startX = 240;

    const drawCube = (cube: Cube): void => {
      if (!cube.visible) return;
      if (!ctx) return;

      const half = cube.size / 2;
      const depth = cube.size / 4;

      ctx.fillStyle = cube.color;
      ctx.beginPath();
      ctx.rect(cube.x - half, cube.y - half, cube.size, cube.size);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      ctx.moveTo(cube.x + half, cube.y - half);
      ctx.lineTo(cube.x + half + depth, cube.y - half - depth);
      ctx.lineTo(cube.x + half + depth, cube.y + half - depth);
      ctx.lineTo(cube.x + half, cube.y + half);
      ctx.closePath();
      ctx.fill();
    }

    const createVerticalLine = (startX: number, startY: number, length: number, cubeSize: number): Cube[] => {
      const line: Cube[] = [];
      for (let i = 0; i < length; i++) {
        line.push({ x: startX, y: startY + i * cubeSize, size: cubeSize, color: '', targetX: 0, targetY: 0, visible: false, delay: 0 });
      }
      return line;
    }

    const createHorizontalLine = (startX: number, startY: number, length: number, cubeSize: number): Cube[] => {
      const line: Cube[] = [];
      for (let i = 0; i < length; i++) {
        line.push({ 
          x: startX + i * cubeSize, 
          y: startY, 
          size: cubeSize, 
          color: '', 
          targetX: startX + i * cubeSize,
          targetY: startY,
          visible: false, 
          delay: 0 
        });
      }
      return line;
    }
    
    const createLetterP = (startX: number, startY: number, cubeSize: number): Cube[] => {
      let PPattern = createVerticalLine(startX, startY, 5, cubeSize);
      PPattern = PPattern.concat(createHorizontalLine(startX, startY, 3, cubeSize));
      PPattern = PPattern.concat(createHorizontalLine(startX, startY + 2 * cubeSize, 2, cubeSize));
      PPattern = PPattern.concat(createVerticalLine(startX + 2 * cubeSize, startY,3, cubeSize));
      return PPattern;
    }
    
    const createLetterO = (centerX: number, centerY: number, radius: number, cubeSize: number): Cube[] => {
      let OPattern: Cube[] = []; 
      const cubeSizeHalf = cubeSize / 2;
      for (let angle = 0; angle < 360; angle += 30) {
        const radian = angle * Math.PI / 180;
        OPattern.push({
          x: centerX + radius * Math.cos(radian) - cubeSizeHalf,
          y: centerY + radius * Math.sin(radian) - cubeSizeHalf,
          size: cubeSize,
          color: '',
          targetX: centerX + radius * Math.cos(radian) - cubeSizeHalf,
          targetY: centerY + radius * Math.sin(radian) - cubeSizeHalf,
          visible: false,
          delay: 0
        });
      }
      return OPattern;
    };
    
    const createLetterR = (startX: number, startY: number, cubeSize: number): Cube[] => {

      let RPattern = createVerticalLine(startX, startY, 5, cubeSize);
      RPattern = RPattern.concat(createHorizontalLine(startX, startY, 3, cubeSize));
    
      RPattern.push({ 
        x: startX + 2 * cubeSize, 
        y: startY + 1 * cubeSize,
        size: cubeSize, 
        color: '',
        targetX: startX + 2 * cubeSize, 
        targetY: startY + 1 * cubeSize,
        visible: false, 
        delay: 0 
      });
    
      RPattern = RPattern.concat(createHorizontalLine(startX, startY + 2 * cubeSize, 3, cubeSize));
    
      RPattern.push({ 
        x: startX + cubeSize, 
        y: startY + 3 * cubeSize,
        size: cubeSize, 
        color: '', 
        targetX: startX + cubeSize, 
        targetY: startY + 3 * cubeSize,
        visible: false, 
        delay: 0 
      });
    
      RPattern.push({ 
        x: startX + 2 * cubeSize, 
        y: startY + 4 * cubeSize,
        size: cubeSize, 
        color: '', 
        targetX: startX + 2 * cubeSize, 
        targetY: startY + 4 * cubeSize,
        visible: false, 
        delay: 0 
      });
      return RPattern;
    }
    
    const createLetterT = (startX: number, startY: number, cubeSize: number): Cube[] => {
      let TPattern = createHorizontalLine(startX, startY, 5, cubeSize);
      TPattern = TPattern.concat(createVerticalLine(startX + 2 * cubeSize, startY, 5, cubeSize));
      return TPattern;
    }
    const createLetterF = (startX: number, startY: number, cubeSize: number): Cube[] => {
      let FPattern = createVerticalLine(startX, startY, 5, cubeSize);
      FPattern = FPattern.concat(createHorizontalLine(startX, startY, 3, cubeSize));
      FPattern = FPattern.concat(createHorizontalLine(startX, startY + 2 * cubeSize, 2, cubeSize));
      return FPattern;
    }
    const createLetterL = (startX: number, startY: number, cubeSize: number): Cube[] => {
      let LPattern = createVerticalLine(startX, startY, 5, cubeSize);
      LPattern = LPattern.concat(createHorizontalLine(startX, startY + 4 * cubeSize, 3, cubeSize));
      return LPattern;
    }
    const createLetterI = (startX: number, startY: number, cubeSize: number): Cube[] => {
      return createVerticalLine(startX + cubeSize, startY, 5, cubeSize);
    }

    const PPattern = createLetterP(startX, startY, cubeSize);
    const OPattern = createLetterO(startX + 7 * cubeSize, startY + cubeSize * 2 + 5, cubeSize * 2, cubeSize);
    const RPattern = createLetterR(startX + 11 * cubeSize, startY, cubeSize);
    const TPattern = createLetterT(startX + 15 * cubeSize, startY, cubeSize);
    const FPattern = createLetterF(startX + 21 * cubeSize, startY, cubeSize);
    const OPattern2 = createLetterO(startX + 27 * cubeSize, startY + cubeSize * 2 + 5, cubeSize * 2, cubeSize);
    const LPattern = createLetterL(startX + 31 * cubeSize, startY, cubeSize);
    const IPattern = createLetterI(startX + 34 * cubeSize, startY, cubeSize);
    const OPattern3 = createLetterO(startX + 40 * cubeSize, startY + cubeSize * 2 + 5, cubeSize * 2, cubeSize);
  
    let maxDelay = 3000;
    let totalCubes = PPattern.length + OPattern.length + RPattern.length + TPattern.length + FPattern.length + LPattern.length + IPattern.length;
    let cubes = [...PPattern, ...OPattern, ...RPattern, ...TPattern, ...FPattern, ...OPattern2, ...LPattern, ...IPattern, ...OPattern3]
    .map((target, index): Cube => {
      let delay = Math.random() * maxDelay * (1 - index / totalCubes);
  
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: cubeSize,
        color: colors[index % colors.length],
        targetX: target.x,
        targetY: target.y,
        visible: false,
        delay: delay
      };
    });
    

    let animationFrameId: number;
    const animate = (): void => {
      if (!ctx) return;
      
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      let currentTime = Date.now();

      cubes.forEach(cube => {
        if (currentTime - startTime > cube.delay) {
          cube.visible = true;
          cube.x += (cube.targetX - cube.x) * 0.05;
          cube.y += (cube.targetY - cube.y) * 0.05;
        }
        drawCube(cube);
      });
    }

    let startTime = Date.now();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default HeroCanvas;