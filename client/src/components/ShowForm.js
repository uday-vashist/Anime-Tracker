import { useState } from "react";
import axios from "axios";

function ShowForm({ onShowAdded }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Watching");
  const [totalEpisodes, setTotalEpisodes] = useState("");
  const [episodesWatched, setEpisodesWatched] = useState("");
  const [type, setType] = useState("Anime");
  const [genre, setGenre] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newShow = {
      title,
      type,
      genre,
      status,
      totalEpisodes: Number(totalEpisodes),
      watchedEpisodes: Number(episodesWatched) || 0,
    };

    try {
      await axios.post("http://localhost:5000/api/shows", newShow);
      onShowAdded(); // refresh list
      setTitle("");
      setTotalEpisodes("");
      setEpisodesWatched("");
      setGenre("");
    } catch (err) {
      console.error("POST ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="form-container glass">
      <h3 style={{ marginBottom: "24px", fontSize: "1.5rem" }}>Add New Show</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="e.g. Attack on Titan"
              className="styled-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Type</label>
            <select
              className="styled-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Anime">Anime</option>
              <option value="TV Series">TV Series</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Genre</label>
            <input
              type="text"
              placeholder="e.g. Action, Drama"
              className="styled-input"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Status</label>
            <select
              className="styled-input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Dropped">Dropped</option>
              <option value="Plan to Watch">Plan to Watch</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label>Total Episodes</label>
            <input
              type="number"
              placeholder="e.g. 24"
              className="styled-input"
              value={totalEpisodes}
              onChange={(e) => setTotalEpisodes(e.target.value)}
              required
              min="1"
            />
          </div>
          <div className="input-group">
            <label>Episodes Watched</label>
            <input
              type="number"
              placeholder="e.g. 12"
              className="styled-input"
              value={episodesWatched}
              onChange={(e) => setEpisodesWatched(e.target.value)}
              min="0"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "10px" }}>
          ➕ Add to Watchlist
        </button>
      </form>
    </div>
  );
}

export default ShowForm;
