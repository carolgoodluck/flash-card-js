import { useState } from "react";
import { Outlet } from "react-router-dom";
import { getAllVocabularies } from "../service/vocabularyService";
import UserInfo from "../components/userInfo/UserInfo";
import Deck from "../components/deck/deck";
import "./root.scss";
import { ModalContext } from "../context";

export async function rootLoader() {
  const vocabularies = await getAllVocabularies();
  vocabularies.sort((x, y) => {
    return Date.parse(x.createdOn) - Date.parse(y.createdOn);
  });
  return vocabularies;
}

export default function Root() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
      <div className="root-container">
        <div className="navigation">
          <UserInfo />
          <Deck />
        </div>
        <Outlet />
      </div>
    </ModalContext.Provider>
  );
}
