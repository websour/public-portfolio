import React, { useRef, useEffect } from 'react';
import { Cube } from '../../../../types/Cube';

interface CanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {}

const Canvas: React.FC<CanvasProps> = (props): JSX.Element => {
  const { className } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const colors = [
      '#61DAFB',
      '#98FF98',
      '#61DAFB'
    ];
    const cubeSize = 40;

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

    const createHouse = (startX: number, startY: number, cubeSize: number): { x: any; y: number; }[] => {
      let housePattern: { x: any; y: number; }[] = [];
    
      // 各行の立方体の数と開始位置のオフセットを配列で定義
      const rows = [
        { cubeSizeAdjustment: 3, xOffsetAdjustment: -3, yOffsetAdjustment: 3 },
        { cubeSizeAdjustment: 4, xOffsetAdjustment: -3, yOffsetAdjustment: 3 },
        { cubeSizeAdjustment: 5, xOffsetAdjustment: -3, yOffsetAdjustment: 3 },
        { cubeSizeAdjustment: 6, xOffsetAdjustment: -3, yOffsetAdjustment: 3 },
        { cubeSizeAdjustment: 2, xOffsetAdjustment: -2, yOffsetAdjustment: 2 },
        { cubeSizeAdjustment: 3, xOffsetAdjustment: -2, yOffsetAdjustment: 2 },
        { cubeSizeAdjustment: 4, xOffsetAdjustment: -2, yOffsetAdjustment: 2 },
        { cubeSizeAdjustment: 5, xOffsetAdjustment: -2, yOffsetAdjustment: 2 },
        { cubeSizeAdjustment: 6, xOffsetAdjustment: -2, yOffsetAdjustment: 2 },
        { cubeSizeAdjustment: 1, xOffsetAdjustment: -1, yOffsetAdjustment: 1 },
        { cubeSizeAdjustment: 2, xOffsetAdjustment: -1, yOffsetAdjustment: 1 },
        { cubeSizeAdjustment: 3, xOffsetAdjustment: -1, yOffsetAdjustment: 1 },
        { cubeSizeAdjustment: 4, xOffsetAdjustment: -1, yOffsetAdjustment: 1 },
        { cubeSizeAdjustment: 5, xOffsetAdjustment: -1, yOffsetAdjustment: 1 },
        { cubeSizeAdjustment: 6, xOffsetAdjustment: -1, yOffsetAdjustment: 1 },
        { cubeSizeAdjustment: 0, xOffsetAdjustment: 0, yOffsetAdjustment: 0 },
        { cubeSizeAdjustment: 1, xOffsetAdjustment: 0, yOffsetAdjustment: 0 },
        { cubeSizeAdjustment: 2, xOffsetAdjustment: 0, yOffsetAdjustment: 0 },
        { cubeSizeAdjustment: 3, xOffsetAdjustment: 0, yOffsetAdjustment: 0 },
        { cubeSizeAdjustment: 4, xOffsetAdjustment: 0, yOffsetAdjustment: 0 },
        { cubeSizeAdjustment: 5, xOffsetAdjustment: 0, yOffsetAdjustment: 0 },
        { cubeSizeAdjustment: 6, xOffsetAdjustment: 0, yOffsetAdjustment: 0 },
        { cubeSizeAdjustment: 0, xOffsetAdjustment: 1, yOffsetAdjustment: -1 },
        { cubeSizeAdjustment: 1, xOffsetAdjustment: 1, yOffsetAdjustment: -1 },
        { cubeSizeAdjustment: 2, xOffsetAdjustment: 1, yOffsetAdjustment: -1 },
        { cubeSizeAdjustment: 3, xOffsetAdjustment: 1, yOffsetAdjustment: -1 },
        { cubeSizeAdjustment: 4, xOffsetAdjustment: 1, yOffsetAdjustment: -1 },
        { cubeSizeAdjustment: 5, xOffsetAdjustment: 1, yOffsetAdjustment: -1 },
        { cubeSizeAdjustment: 0, xOffsetAdjustment: 2, yOffsetAdjustment: -2 },
        { cubeSizeAdjustment: 1, xOffsetAdjustment: 2, yOffsetAdjustment: -2 },
        { cubeSizeAdjustment: 2, xOffsetAdjustment: 2, yOffsetAdjustment: -2 },
        { cubeSizeAdjustment: 3, xOffsetAdjustment: 2, yOffsetAdjustment: -2 },
        { cubeSizeAdjustment: 4, xOffsetAdjustment: 2, yOffsetAdjustment: -2 },
        { cubeSizeAdjustment: 0, xOffsetAdjustment: 3, yOffsetAdjustment: -3 },
        { cubeSizeAdjustment: 1, xOffsetAdjustment: 3, yOffsetAdjustment: -3 },
        { cubeSizeAdjustment: 2, xOffsetAdjustment: 3, yOffsetAdjustment: -3 },
        { cubeSizeAdjustment: 3, xOffsetAdjustment: 3, yOffsetAdjustment: -3 },
      ];
    
      rows.forEach(row => {
        housePattern.push({
          x: startX + row.xOffsetAdjustment * cubeSize / 2 + row.cubeSizeAdjustment * cubeSize,
          y: startY -3 * cubeSize  + row.yOffsetAdjustment * cubeSize,
        });
      });
    
      return housePattern;
    }

    const startY = height / 1.4 + cubeSize;
    const startX = width / 2.2 - cubeSize * 2.5;
    const housePattern = createHouse(startX, startY, cubeSize);
    
    let cubes: Cube[] = housePattern.map((target, index): Cube => {
      return {
        x: target.x, // 目的地に直接設定
        y: target.y, // 目的地に直接設定
        size: cubeSize,
        color: colors[index % colors.length],
        targetX: target.x,
        targetY: target.y,
        visible: true, // 初期状態で可視
        delay: 0 // delayは不要なので0または削除
      };
    });

    let startTime = Date.now();

    const animate = (): void => {
      if (!ctx) return;
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);
    
      // 集合体の中心を計算
      const centerX = housePattern.reduce((acc, val) => acc + val.x, 0) / housePattern.length;
      const centerY = housePattern.reduce((acc, val) => acc + val.y, 0) / housePattern.length;
    
      ctx.translate(centerX, centerY);
      
      // 回転速度を緩やかにするために係数を調整
      const rotationSpeed = 0.4;
      ctx.rotate(((Date.now() - startTime) / (1000 / rotationSpeed)) % (2 * Math.PI));
    
      ctx.translate(-centerX, -centerY);
    
      cubes.forEach(cube => {
        drawCube(cube);
      });
    
      // 次のフレームのために回転と移動をリセット
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    animate();

    // クリーンアップ関数
    return (): void => {
      const id = requestAnimationFrame(animate);
      cancelAnimationFrame(id);
    };
  }, []);

  return <canvas className={className} ref={canvasRef} {...props} />;
};

export default Canvas;
