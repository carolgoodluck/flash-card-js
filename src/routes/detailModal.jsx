import { Link, useLoaderData } from "react-router-dom";
import { getVocabularyById } from "../service/vocabularyService";
import "./detailModal.scss";
import { useModalContext } from "../context";

export async function loader({ params }) {
  const vocabulary = await getVocabularyById(params.id);
  return vocabulary;
}

export default function DetailModal() {
  const vocabulary = useLoaderData();
  const { setModalOpen } = useModalContext();

  return (
    <div className="detail-modal">
      <div className="detail-header">
        <Link to="/vocabularies" onClick={() => setModalOpen(false)}>
          <button type="button" className="btn-close" aria-label="Close" />
        </Link>
      </div>
      <div>{vocabulary.word}</div>
      <div>{vocabulary.format}</div>
      <div>{vocabulary.meaning}</div>
      <div>{vocabulary.example}</div>
      <div className="detail-footer">
        <Link to="/vocabularies" onClick={() => setModalOpen(false)}>
          <button type="button" className="btn btn-secondary">
            Cancel
          </button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </div>
  );
}
