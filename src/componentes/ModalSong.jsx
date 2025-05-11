import React, {useState}from "react";
import { X } from "lucide-react";
import './modal.css';

const SongModal = ({ isOpen, onClose, song, onPlay}) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  if (!isOpen) return null;

  // Extraemos el video URL de la canción
  const youtubeUrl = song?.youtubeUrl;

  const handlePlayClick = () => {
    if (onPlay) {
      onPlay(song);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="close-button">
          <X />
        </button>
        <div className="song-details">
          <p><strong>Título:</strong> {song?.title}</p>
          
        </div>

        
        {/* Si existe un videoUrl, mostramos el iframe */}
        {youtubeUrl && (
          <div className="video-frame">
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${youtubeUrl.split('v=')[1]}?autoplay=1`} 
              title="Video de la canción" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongModal;

