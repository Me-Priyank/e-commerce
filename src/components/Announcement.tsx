import React from 'react';
import { X } from 'lucide-react';

interface AnnouncementProps {
  message: string;
  onClose: () => void;
}

const Announcement: React.FC<AnnouncementProps> = ({ message, onClose }) => {
  return (
    <div className="bg-dark text-white py-2 px-4 text-center relative">
      <p className="text-sm">{message}</p>
      <button 
        onClick={onClose} 
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Announcement;