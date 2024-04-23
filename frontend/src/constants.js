const API_URL  = process.env.NODE_ENV !== "development" ? process.env.BASE_URL : "http://localhost:3001"

export default API_URL;