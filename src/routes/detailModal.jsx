import { Link, useLoaderData, Form, useNavigate } from "react-router-dom";
import {
  deleteVocabulary,
  getVocabularyById,
  updateVocabulary,
} from "../service/vocabularyService";
import "./detailModal.scss";
import { useModalContext } from "../context";

export async function loader({ params }) {
  const vocabulary = await getVocabularyById(params.id);
  return vocabulary;
}

export default function DetailModal() {
  const vocabulary = useLoaderData();
  const { setModalOpen } = useModalContext();
  const navigate = useNavigate();

  const formats = ["verb", "noun", "adj", "adv"];

  const handleDetailChange = (event) => {
    vocabulary[event.target.name] = event.target.value;
  };

  const handleUpdateVocabulary = async () => {
    const formData = new FormData();
    formData.append("word", vocabulary.word);
    formData.append("format", vocabulary.format);
    formData.append("meaning", vocabulary.meaning);
    formData.append("example", vocabulary.example);
    formData.append("id", vocabulary.id);
    formData.append("createdOn", vocabulary.createdOn);
    const updatedVocabulary = Object.fromEntries(formData);
    await updateVocabulary(updatedVocabulary);
    setModalOpen(false);
    navigate("/vocabularies");
  };

  const handleDeleteVocabulary = async () => {
    await deleteVocabulary(vocabulary.id);
    setModalOpen(false);
    navigate("/vocabularies");
  };

  return (
    <div className="detail-modal">
      <div className="detail-header">
        <Link to="/vocabularies" onClick={() => setModalOpen(false)}>
          <button type="button" className="btn-close" aria-label="Close" />
        </Link>
      </div>
      <Form onSubmit={handleUpdateVocabulary}>
        <div className="detail-content">
          <input
            className="detail-word"
            name="word"
            defaultValue={vocabulary.word}
            onChange={handleDetailChange}
          />
          <div className="detail-expansion">
            <select
              className="detail-format"
              name="format"
              defaultValue={vocabulary.format}
              onChange={handleDetailChange}
            >
              {formats.map((format, index) => (
                <option key={index} value={format}>
                  {format}
                </option>
              ))}
            </select>
            <textarea
              className="detail-meaning"
              name="meaning"
              defaultValue={vocabulary.meaning}
              onChange={handleDetailChange}
            />
            <textarea
              className="detail-example"
              name="example"
              defaultValue={vocabulary.example}
              onChange={handleDetailChange}
            />
          </div>
        </div>
        <div className="detail-footer">
          <button
            className="btn btn-secondary"
            onClick={handleDeleteVocabulary}
          >
            Delete
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
