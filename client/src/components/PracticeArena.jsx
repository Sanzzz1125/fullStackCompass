import React from 'react';

export default function PracticeArena({ games }) {
    return (
        <div>
            <div className="section-divider">
                <span className="section-divider-text">🎮 Practice Arena</span>
            </div>
            <p style={{ color: 'var(--text2)', fontSize: '14px', marginBottom: '16px' }}>
                Level up your skills with these interactive games and challenges.
            </p>
            <div className="game-grid">
                {games.map((game, i) => (
                    <a
                        key={i}
                        href={game.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="game-card"
                    >
                        <div className="game-card-emoji">{game.emoji}</div>
                        <h5>{game.name}</h5>
                        <p>{game.description}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}