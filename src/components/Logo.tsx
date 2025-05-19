import React from 'react';
import { Flower } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="items-center">
      <Flower className="text-gold" size={82} />
      <span className="font-heading text-2xl ml-1">Elegance</span>
    </div>
  );
};

export default Logo;