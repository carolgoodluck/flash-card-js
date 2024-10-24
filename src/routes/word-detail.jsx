import { useLoaderData } from "react-router-dom";
import { getVocabularyById } from "../service/vocabularyService"

export async function loader({ params }) {
    const vocabulary = await getVocabularyById(params.id);
    return vocabulary;
}

export default function WordDetail() {
    const vocabulary = useLoaderData();

    return (
        <div>
            <div>{vocabulary.word}</div>
            <div>{vocabulary.format}</div>
            <div>{vocabulary.meaning}</div>
            <div>{vocabulary.example}</div>
        </div>
    )
}