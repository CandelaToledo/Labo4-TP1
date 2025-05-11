import { useState, useEffect } from 'react'
import FormSong from './componentes/FormSong';
import ListSong from './componentes/ListSong';
import ModalSong from './componentes/ModalSong';
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);


  const [songs, setSong] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByPlays, setSortByPlays] = useState(false);


  const clearSongs = () => {
  setSong([]); // Vacía el estado
  localStorage.removeItem("songs"); // Borra también del localStorage
  };

  useEffect (() => {
    const savedSong = JSON.parse(localStorage.getItem("songs")) || []
    setSong(savedSong)
  }, [])

    // Función para agregar una canción
  const handleSong = (newSong) => {
    // Añadimos la propiedad 'plays' inicializada en 0
    const newSongWithPlays = {
      ...newSong,
      plays: 0,  // Inicializamos el contador de reproducciones en 0
    };

    // Agregamos la nueva canción con la propiedad 'plays'
    const updatedSongs = [...songs, newSongWithPlays];

    // Actualizamos el estado con la nueva lista de canciones
    setSong(updatedSongs);

    // Guardamos la lista actualizada en localStorage
    localStorage.setItem("songs", JSON.stringify(updatedSongs));
  };
    
    const openModal = (song) => {
      handlePlay(song);
    setSelectedSong(song);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSong(null);
    setIsModalOpen(false);
  };

  const filteredSongs = songs
  .filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

const sortedSongs = sortByPlays
  ? [...filteredSongs].sort((a, b) => b.plays - a.plays)
  : filteredSongs;


  const handlePlay = (songToUpdate) => {
  const updatedSongs = songs.map(song =>
    song.id === songToUpdate.id
      ? { ...song, plays: song.plays + 1 }
      : song
  );
  setSong(updatedSongs);
  localStorage.setItem("songs", JSON.stringify(updatedSongs));
};

  return (
    <>
      <div>
        <div className="modo">
          <button onClick={() => setDarkMode(!darkMode)} className="modo-toggle">
         {darkMode ? "☀" : "🌙"}
        </button>
        </div>
        


        <h1>REPRODUCTOR DE CANCIONES </h1>
        <div className="filtro">
          <input
        type="text"
        placeholder="Buscar por título o artista"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        </div>
        
        <button onClick={() => setSortByPlays(!sortByPlays)} className="ordenar">
          {sortByPlays ? "Mostrar sin ordenar" : "Ordenar por reproducciones"}
        </button>



        <div className="contenedor">
          <div className="columna-izquierda">
            <ListSong songs={sortedSongs} onSongClick={openModal} onPlay={handlePlay}/> 
            <button className='borrar' onClick={clearSongs} >
            Borrar listado de canciones
            </button>
          </div>
          
        <div className="columna-derecha">
          <FormSong AddSong={handleSong} songs={songs}/>
        </div>
          <ModalSong 
          isOpen={isModalOpen}
          onClose={closeModal}
          song={selectedSong}
          onPlay={handlePlay}
          />
        </div>
      </div>
    </>
  )
}

export default App
