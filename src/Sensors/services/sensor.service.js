

import axios from 'axios'

// 🔥 Temperatura real desde Open-Meteo
export const getTemperatureData = async () => {
  try {
    const res = await axios.get(
      'https://api.open-meteo.com/v1/forecast?latitude=-12.04&longitude=-77.03&hourly=temperature_2m'
    )
    return res.data.hourly.temperature_2m.slice(0, 10)
  } catch (error) {
    console.error('❌ Error al obtener temperatura:', error)
    return [20, 21, 19, 22, 23, 21, 20, 22, 24, 23] // fallback
  }
}

// 🔥 Gases desde WeatherAPI usando tu key real
const WEATHER_API_KEY = 'ec7f3e8a6dc4426ea98204022251105'

export const getGasLevels = async () => {
  try {
    const res = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Lima&aqi=yes`
    )
    const { co, no2, o3 } = res.data.current.air_quality
    return [co, no2, o3]
  } catch (error) {
    console.error('❌ Error al obtener niveles de gas:', error)
    return [15, 30, 20] // fallback simulado
  }
}
