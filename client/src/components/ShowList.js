import { useEffect, useState } from "react";
import axios from "axios";
import ShowForm from "./ShowForm";

function ShowList() {
  const [shows, setShows] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const [editingShow, setEditingShow] = useState(null);
  const [updatedEpisodes, setUpdatedEpisodes] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");

  const fetchShows = () => {
    axios.get("http://localhost:5000/api/shows")
      .then(res => setShows(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchShows();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this show?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/shows/${id}`);
      fetchShows();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/shows/${id}`, {
        watchedEpisodes: Number(updatedEpisodes) || 0,
        status: updatedStatus,
      });
      setEditingShow(null);
      fetchShows();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const getStatusClass = (status) => {
    return `status-${status.replace(/\s+/g, "")}`;
  };

  return (
    <div>
      <ShowForm onShowAdded={fetchShows} />

      <div className="filter-bar glass">
        <label style={{ fontWeight: 600 }}>🔍 Filter by Status</label>
        <select
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Shows</option>
          <option value="Watching">Watching</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
          <option value="Dropped">Dropped</option>
          <option value="Plan to Watch">Plan to Watch</option>
        </select>
      </div>

      {shows.length === 0 ? (
        <div className="empty-state glass" style={{ borderRadius: '16px' }}>
          <h2>No shows added yet.</h2>
          <p>Start by adding your first Anime or TV Series above! 🍿</p>
        </div>
      ) : (
        <ul className="shows-grid">
          {shows
            .filter(show => filterStatus === "All" || show.status === filterStatus)
            .map(show => {
              const watched = show.watchedEpisodes ?? 0;
              const total = show.totalEpisodes || 1;
              const progressPercentage = Math.min((watched / total) * 100, 100);

              return (
                <li key={show._id} className={`show-card glass ${getStatusClass(show.status)}`}>
                  {editingShow === show._id ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'center' }}>
                      <input
                        type="number"
                        className="styled-input"
                        value={updatedEpisodes}
                        onChange={(e) => setUpdatedEpisodes(e.target.value)}
                        placeholder="Episodes Watched"
                        min="0"
                      />
                      <select
                        className="styled-input"
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                      >
                        <option value="Watching">Watching</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Dropped">Dropped</option>
                        <option value="Plan to Watch">Plan to Watch</option>
                      </select>
                      <div className="card-actions">
                        <button className="btn btn-success" onClick={() => handleUpdate(show._id)}>Save</button>
                        <button className="btn btn-secondary" onClick={() => setEditingShow(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="card-header">
                        <h3 className="show-title">{show.title}</h3>
                        <span className="show-badge">{show.type}</span>
                      </div>
                      
                      <div className="card-body">
                        <div style={{ fontSize: '0.9rem', marginBottom: '8px', opacity: 0.8 }}>
                          <strong>Genre:</strong> {show.genre}
                        </div>
                        <div style={{ fontSize: '0.9rem', marginBottom: '8px', opacity: 0.8 }}>
                          <strong>Status:</strong> {show.status}
                        </div>
                        
                        <div className="progress-container">
                          <div className="progress-text">
                            <span>Progress</span>
                            <strong>{watched} / {total} Episodes</strong>
                          </div>
                          <div className="progress-bar-bg">
                            <div 
                              className="progress-bar-fill" 
                              style={{ width: `${progressPercentage}%`, background: progressPercentage === 100 ? 'var(--success-color)' : '' }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="card-actions">
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setEditingShow(show._id);
                            setUpdatedEpisodes(watched);
                            setUpdatedStatus(show.status);
                          }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(show._id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}

export default ShowList;
