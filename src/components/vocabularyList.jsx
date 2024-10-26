import { Link, Outlet, useLoaderData } from "react-router-dom";
import {
  getAllVocabularies,
  getFamiliarVocabularies,
  getUnfamiliarVocabularies,
} from "../service/vocabularyService";
import WordCard from "./word/WordCard";
import { useModalContext } from "../context";
import "./vocabularyList.scss";

export async function allVocabularyLoader() {
  const vocabularies = await getAllVocabularies();
  return vocabularies;
}

export async function familiarVocabularyLoader() {
  const vocabularies = await getFamiliarVocabularies();
  return vocabularies;
}

export async function unfamiliarVocabularyLoader() {
  const vocabularies = await getUnfamiliarVocabularies();
  return vocabularies;
}

export default function VocabularyList() {
  const vocabularies = useLoaderData();
  const { modalOpen, setModalOpen } = useModalContext();

  return (
    <>
      <div className="deck-container">
        <div className={"card-list " + (modalOpen ? "page-disabled" : "")}>
          {vocabularies.map((vocabulary) => (
            <Link
              className="card-link"
              to={vocabulary.id}
              key={vocabulary.id}
              onClick={() => setModalOpen(true)}
            >
              <WordCard className="card-container" word={vocabulary.word} />
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
}
