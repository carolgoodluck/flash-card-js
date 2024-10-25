import { useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getAllVocabularies } from "../service/vocabularyService";
import WordCard from "../components/word/WordCard";
import UserInfo from "../components/userInfo/UserInfo";
import Deck from "../components/deck/deck";
import "./root.scss";
import { ModalContext } from "../context";

export async function loader() {
  const vocabularies = await getAllVocabularies();
  vocabularies.sort((x, y) => {
    return Date.parse(x.createdOn) - Date.parse(y.createdOn);
  });
  return vocabularies;
}

export default function Root() {
  const vocabularies = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <div className="root-container">
        <div className="navigation">
          <UserInfo />
          <Deck />
        </div>
        <div className={'card-list ' + (modalOpen ? 'page-disabled' : '')}>
          {vocabularies.map((vocabulary) => (
            <Link
              className="card-link"
              to={vocabulary.id}
              key={vocabulary.id}
              onClick={() => setModalOpen(true)}
            >
              <WordCard className='card-container' word={vocabulary.word} />
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </ModalContext.Provider>
  );
}
