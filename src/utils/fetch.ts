import axios from "axios"

export const getGamificationData = async() => {
    return axios.get('/api/gamification/get-gamification')
}