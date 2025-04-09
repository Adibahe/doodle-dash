
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const Instructions: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          How to play
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">How to Play Draw Dash</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Rules:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>You'll be given a word to draw</li>
              <li>Draw the object as QUICKLY as possible</li>
              <li>The faster the AI recognizes your drawing, the better!</li>
              <li>You have 60 seconds per round to get recognized</li>
              <li>Try to improve your recognition time with each round</li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Tips:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Draw in the center of the canvas</li>
              <li>Draw clearly but quickly - speed matters!</li>
              <li>Start with the most recognizable features first</li>
              <li>You can clear the canvas and start over if needed</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Instructions;
