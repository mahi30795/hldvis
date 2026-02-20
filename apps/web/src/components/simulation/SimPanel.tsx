import React from 'react';
import { SimControls } from './SimControls';
import { SimResults } from './SimResults';

export const SimPanel: React.FC = () => {
  return (
    <div className="flex items-stretch border-t border-gray-700 bg-gray-800 h-28">
      <div className="border-r border-gray-700">
        <SimControls />
      </div>
      <SimResults />
    </div>
  );
};
