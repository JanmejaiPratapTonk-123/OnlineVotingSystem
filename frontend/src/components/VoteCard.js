import React from 'react';

const VoteCard = ({ candidate, onVote }) => (
  <div>
    <h3>{candidate.name}</h3>
    <button onClick={() => onVote(candidate._id)}>Vote</button>
  </div>
);

export default VoteCard;