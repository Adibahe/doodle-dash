
import React, { useEffect, useRef, useState } from 'react';

interface DrawingCanvasProps {
  isDrawingEnabled: boolean;
  onDrawingComplete: (imageData: string) => void;
  onClear: () => void;
  width?: number;
  height?: number;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({
  isDrawingEnabled,
  onDrawingComplete,
  onClear,
  width = 400,
  height = 400,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas properties
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 5;
    context.strokeStyle = '#000000';

    // Clear canvas
    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);

    setCtx(context);
  }, []);

  // Handle clear request
  useEffect(() => {
    const clearCanvas = () => {
      if (!canvasRef.current || !ctx) return;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    };

    window.addEventListener('clear-canvas', clearCanvas);
    return () => window.removeEventListener('clear-canvas', clearCanvas);
  }, [ctx, width, height]);

  const startDrawing = (x: number, y: number) => {
    if (!isDrawingEnabled || !ctx) return;
    
    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (x: number, y: number) => {
    if (!isDrawing || !isDrawingEnabled || !ctx) return;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (!isDrawing || !ctx) return;
    
    ctx.closePath();
    setIsDrawing(false);
    
    // Get image data and pass to parent
    if (canvasRef.current) {
      const imageData = canvasRef.current.toDataURL('image/png');
      onDrawingComplete(imageData);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    startDrawing(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    draw(x, y);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;
    
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    startDrawing(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;
    
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    draw(x, y);
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !ctx) return;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
    onClear();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="drawing-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={endDrawing}
      />
      <button 
        onClick={clearCanvas} 
        className="mt-4 btn-outline"
        disabled={!isDrawingEnabled}
      >
        Clear Canvas
      </button>
    </div>
  );
};

export default DrawingCanvas;
