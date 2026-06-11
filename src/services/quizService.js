import axios from "axios"

const difficultyList = ["easy", "medium", "hard"]
const typeList = ["multiple", "boolean"]

export const getQuizQuestion = async (categoryId, difficulty, type) => {
    if(!difficultyList.includes(difficulty)){
        console.error("Tingkat kesulitan tidak valid")
        return null;
    }
    if(!typeList.includes(type)){
        console.error("Tipe soal tidak valid")
        return null;
    }
    if(!categoryId){
        console.error("Kategori soal tidak valid")
        return null;
    }
    try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=${type}`)

        return response.data.results
    } catch (error) {
        console.error("Error dalam pengambilan data soal: ", error.message)
        throw error
    }
}