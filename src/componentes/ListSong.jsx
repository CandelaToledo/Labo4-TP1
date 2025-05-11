
import React from "react";
import './list.css';
const ListSong = ({songs, onSongClick, onPlay}) => {
    return (
        <div className="listado">
            <h2>Listado</h2>
            {songs.length === 0 ? (
                <p>No se reprodujo ninguna canción</p>
            ) : (
                <ul>
                {songs.map((song) => (
                <li key={song.id} >
                    <p><strong>{song.title}</strong> - {song.artist} </p>
                    <p><strong> Reproducciones:</strong> {song.plays}</p>
                    <button onClick={() => onSongClick(song)} onPlay={song}>Escuchar</button>
                </li>
                ))}
                </ul>
            )}
        </div>
    )
}
export default ListSong;
