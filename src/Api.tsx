const API_KEY = '865c34b82ed04588983163717223004';

const Api = async (city : string) => {
    try {
      const baseURL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      const fetchResponse = await fetch(baseURL)
      const data =await fetchResponse.json()
      return data;
    } catch (err) {
        console.log(err)
  }
}

export default Api;