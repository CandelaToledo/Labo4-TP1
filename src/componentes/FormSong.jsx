import React, {useState}from "react";
import './form.css';
const FormSong = ({AddSong, songs}) => {
    const [title, setTitle] = useState("");

    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!title || !youtubeUrl) {
        setError("Todos los campos son obligatorios");
        return;
        }

        const urlExists = songs.some(
        (song) => song.youtubeUrl.trim() === youtubeUrl.trim()
        );

        if (urlExists) {
        setError("Ya existe una canción con esta URL de YouTube.");
        return;
        }

        const isValidYoutubeUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(youtubeUrl.trim());

        if (!isValidYoutubeUrl) {
        setError("Por favor ingresá una URL válida de YouTube.");
        return;
        }
      
          const newSong = {
            id: Date.now(),
            title,
            youtubeUrl,
            plays: 0, // Contador de reproducciones
          };
      
          AddSong(newSong);
          setTitle("");
          //setArtist("");
          setYoutubeUrl("");
          setError("");
    }
        
    

return (
  <>
  {error && <p style={{ color: 'red', marginBottom: '10px', textAlign:'center'}}>{error}</p>}

    <form onSubmit={handleSubmit} className="form-song">
      <div>
        <label>Nombre de la canción:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
        />
      </div>

    

      <div>
        <label>URL de YouTube:</label>
        <input
          type="text"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="input-field"
        />
      </div>

      <button type="submit">Agregar canción</button>
    </form>
    </>
  );
}
export default FormSong;