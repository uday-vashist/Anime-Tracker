import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <div className="hero glass" style={{ borderRadius: '24px' }}>
        <h1 className="page-title" style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
          Your Ultimate Watchlist
        </h1>
        <p>Track your favorite Anime and TV Series seamlessly. Rate, review, and never lose your place again.</p>
        <Link to="/dashboard" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', textDecoration: 'none' }}>
          Go to Dashboard ✨
        </Link>
      </div>
    </div>
  );
}

export default Home;
