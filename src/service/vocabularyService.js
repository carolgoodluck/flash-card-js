import axios from "axios";

const API_URL = "http://localhost:8080/vocabularies";

export async function getAllVocabularies() {
    const { data } = await axios.get(`${API_URL}`);
    return data;
}

export async function getVocabularyById(id) {
    const { data } = await axios.get(`${API_URL}/${id}`)
    return data;
}