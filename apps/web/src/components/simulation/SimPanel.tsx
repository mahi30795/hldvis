import React from 'react';
import { SimControls } from './SimControls';
import { SimResults } from './SimResults';

export const SimPanel: React.FC = () => {
  return (
    <div className="flex items-stretch border-t border-divider-subtle/10 glass h-32 animate-fade-in-up">
      <div className="border-r border-divider-subtle/10 flex-shrink-0">
        <SimControls />
      </div>
      <SimResults />
    </div>
  );
};
