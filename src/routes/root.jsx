import { Link, Outlet, useLoaderData } from "react-router-dom";
import { getAllVocabularies } from "../service/vocabularyService";
import WordCard from "../components/word/WordCard";
import UserInfo from "../components/userInfo/UserInfo";
import Deck from "../components/deck/deck";
import './root.scss';

export async function loader() {
    const vocabularies = await getAllVocabularies();
    return vocabularies;
}

export default function Root() {
    const vocabularies = useLoaderData();
    console.log(vocabularies);

    return (
        <div className="root-container">
            <div className="navigation">
                <UserInfo />
                <Deck />
            </div>
            {vocabularies.map(vocabulary => 
            <Link to={vocabulary.id} key={vocabulary.id}>
                <WordCard word={vocabulary.word}/>
            </Link>)}
            <Outlet />
        </div>
    )
}
