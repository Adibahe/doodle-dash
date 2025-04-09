import React from 'react';
import GameController from '@/components/GameController';
import Instructions from '@/components/Instructions';
import { Pencil, Github } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="py-6 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Pencil size={28} className="text-primary" />
            <h1 className="text-2xl font-bold">Draw Dash</h1>
          </div>
          <div className="flex items-center gap-4">
            <Instructions />
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-10 px-4">
        <GameController />
      </main>
      
      <footer className="py-6 border-t mt-10">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>This is a fun project inspired by Google's Quick Draw game.</p>
          <p className="mt-2">Not affiliated with Google. Created for educational purposes.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
