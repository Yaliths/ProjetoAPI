const { createClient } = require("@supabase/supabase-js");

const SUPABASE_URL = "https://bufxnnnnoyeqliigzmny.supabase.co";

const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_API_KEY);

async function getWeatherAndPlaces(city, country, date) {
  try {
    const locationQuery = `${city}, ${country}`;

    // 1. Buscar clima na WeatherAPI para a data especificada
    const weatherResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${locationQuery}&dt=${date}`
    );
    if (!weatherResponse.ok) throw new Error("Erro ao buscar clima.");
    const weatherData = await weatherResponse.json();

    // Extrair informações do clima
    const forecast = weatherData.forecast.forecastday[0].day;
    const weatherDescription = forecast.condition.text.toLowerCase();
    const temperature = forecast.avgtemp_c;

    console.log(
      `Clima em ${city}, ${country} no dia ${date}: ${weatherDescription}, ${temperature}°C`
    );

    // 2. Escolher o tipo de local com base no clima
    let category = "";
    if (weatherDescription.includes("rain")) {
      console.log("Está previsto chuva. Procurando lugares cobertos...");
      category = "13066,13032,10026,12042,10035"; // Categorias de lugares cobertos
    } else {
      console.log(
        "Clima bom previsto para atividades ao ar livre. Procurando parques..."
      );
      category = "13059,10000,13019,10069,16026,16041"; // Categorias ao ar livre
    }

    // 3. Buscar o endereço IP
    const ipResponse = await fetch("https://api.ipify.org?format=json");
    if (!ipResponse.ok) throw new Error("Erro ao buscar o IP.");
    const ipData = await ipResponse.json();
    const userIP = ipData.ip;

    console.log(`IP do usuário: ${userIP}`);

    // 4. Buscar lugares na Foursquare Places API
    const placesResponse = await fetch(
      `https://api.foursquare.com/v3/places/search?near=${city}, ${country}&categories=${category}&limit=10`,
      {
        headers: {
          Authorization: process.env.FOURSQUARE_API_KEY,
        },
      }
    );
    if (!placesResponse.ok) throw new Error("Erro ao buscar lugares.");
    const placesData = await placesResponse.json();
    console.log(placesData.results[0].name);
    const names = placesData.results.map((result) => result.name);

    // 5. Salvar os dados no Supabase
    const { data, error } = await supabase.from("Teste").insert([
      {
        county: country,
        city: city,
        data: date,
        ip: userIP,
        weather: weatherDescription,
        temp: temperature,
        nome: names,
        Resposta: placesData.results,
      },
    ]);

    if (error) {
      console.error("Erro ao salvar no Supabase:", error.message);
    } else {
      console.log("Dados salvos no Supabase com sucesso:");
    }

    return {
      weatherDescription, // Descrição do clima
      temperature, // Temperatura
      results: placesData.results, // Lista de lugares
    };
  } catch (error) {
    console.error("Erro:", error.message);
    return null; // Retorna null em caso de erro
  }
}

module.exports = { getWeatherAndPlaces };
