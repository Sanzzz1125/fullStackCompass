import React from 'react';

const TYPE_COLORS = {
    docs: 'var(--blue)',
    tutorial: 'var(--green)',
    tool: 'var(--yellow)',
    course: 'var(--purple)',
    game: 'var(--pink)',
    reference: 'var(--teal)',
    video: 'var(--orange)',
    generator: 'var(--teal)',
};

export default function ResourceCard({ type = 'docs', title, description, url }) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
        >
            <div className="resource-card-type" style={{ color: TYPE_COLORS[type] || 'var(--blue)' }}>
                {type}
            </div>
            <h4>{title}</h4>
            <p>{description}</p>
        </a>
    );
}