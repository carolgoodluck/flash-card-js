import './WordCard.scss';

export default function WordCard({ word }) {
  return (
    <div className="card card-container">
      <div className="card-icon-container">
        <i className="card-icon-info bi bi-info-circle" />
      </div>
      <div className="card-text">{word}</div>
    </div>
  );
}
