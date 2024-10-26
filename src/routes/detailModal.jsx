import { Link, useLoaderData, Form, useNavigate, useOutletContext } from "react-router-dom";
import {
  deleteVocabulary,
  getVocabularyById,
  updateVocabulary,
} from "../service/vocabularyService";
import "./detailModal.scss";
import { useModalContext } from "../context";
import { useState } from "react";

export async function loader({ params }) {
  const vocabulary = await getVocabularyById(params.id);
  return vocabulary;
}

export default function DetailModal() {
  const vocabulary = useLoaderData();
  const [familiar, setFamiliar] = useState(vocabulary.isFamiliar);
  const {setModalOpen} = useModalContext();
  
  const navigate = useNavigate();

  const formats = ["verb", "noun", "adj", "adv"];

  const handleDetailChange = (event) => {
    vocabulary[event.target.name] = event.target.value;
  };

  const handleUpdateVocabulary = async () => {
    const formData = new FormData();
    Object.entries(vocabulary).forEach(([key, value]) => formData.append(key, value));
    const updatedVocabulary = Object.fromEntries(formData);
    await updateVocabulary(updatedVocabulary);
    setModalOpen(false);
    navigate(-1);
  };

  const handleDeleteVocabulary = async () => {
    await deleteVocabulary(vocabulary.id);
    setModalOpen(false);
    navigate(-1);
  };
  
  const handleFamiliarFlag = () => {
    const newFlag = !familiar;
    vocabulary.isFamiliar = newFlag;
    setFamiliar(newFlag);
  };

  return (
    <div className="detail-modal">
      <div className="detail-header">
        <i className={'detail-star bi ' + (familiar ? 'bi-star': 'bi-star-fill')} onClick={handleFamiliarFlag} />
        <Link to={-1} onClick={() => setModalOpen(false)}>
          <i className="detail-close bi bi-x-circle" />
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
