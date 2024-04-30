import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import SearchBar from "./SearchBar";
import { getCurrentAstronomy, getCurrentForecast, getCurrentWeather } from "../services/weather";
import WindSvg from "./svg/WindSvg";
import WaterSvg from "./svg/WaterSvg";
import SunSvg from "./svg/SunSvg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Landing = () => {
  const currentDay = new Date().getDay();
  const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
  const [cityFromSearchBar, setCityFromSearchBar] = React.useState("");
  const [isInit, setIsInit] = React.useState(true);
  const [actualCity, setActualCity] = React.useState({});
  const [actualAstronomy, setActualAstronomy] = React.useState({});
  const [actualForecast, setActualForecast] = React.useState([]);

  useEffect(() => {
    let valueToSearch = cityFromSearchBar || "Paris";
    if (isInit) {
      setIsInit(false);
      AsyncStorage.getItem("lastPos").then((res) => {
        valueToSearch = res || "Paris";
        fetchWeatherData(valueToSearch);
      });
    } else {
      fetchWeatherData(valueToSearch);
    }
  }, [cityFromSearchBar]);

  fetchWeatherData = (valueToSearch) => {
    getCurrentWeather(valueToSearch)
      .then((e) => {
        setActualCity(e);
      })
      .catch((e) => console.log(e.message));

    getCurrentAstronomy(valueToSearch)
      .then((e) => {
        setActualAstronomy(e);
      })
      .catch((e) => console.log(e.message));

    getCurrentForecast(valueToSearch)
      .then((e) => {
        setActualForecast(e);
      })
      .catch((e) => console.log(e.message));
  };

  return (
    <View style={styles.globalContainer}>
      <View style={styles.container}>
        <SearchBar setCityFromSearchBar={setCityFromSearchBar} />
        <Text style={styles.greeting}>
          {actualCity?.location?.name}, {actualCity?.location?.region}
        </Text>
      </View>
      <View style={styles.topInfoContainer}>
        <Image style={styles.weatherIcon} source={{ uri: "https:" + actualCity?.current?.condition?.icon }} />
        <View style={styles.topInfoView}>
          <Text style={styles.topInfoViewTemp}>{actualCity?.current?.temp_c} °C</Text>
          <Text style={{ color: "white" }}>{actualCity?.current?.condition?.text}</Text>
        </View>
      </View>

      <View style={styles.midInfoContainer}>
        <View style={styles.midInfoView}>
          <WindSvg />
          <Text style={{ color: "white" }}>{actualCity?.current?.wind_kph} km/h</Text>
        </View>
        <View style={styles.midInfoView}>
          <WaterSvg />
          <Text style={{ color: "white" }}>{actualCity?.current?.humidity}%</Text>
        </View>
        <View style={styles.midInfoView}>
          <SunSvg />
          <Text style={{ color: "white" }}>{actualAstronomy?.astronomy?.astro?.sunrise}</Text>
        </View>
      </View>

      <View style={styles.bottomInfoContainer}>
        {actualForecast
          .map((res, mapIndex) => {
            return (
              <View keyExtractor={mapIndex} style={styles.bottomInfoView}>
                <Image style={styles.bottomWeatherIcon} source={{ uri: "https:" + res.day.condition.icon }} />
                <Text style={{ fontWeight: 600 }}>{daysOfWeek[(currentDay + mapIndex + 1) % 7]}</Text>
                <Text style={{ fontWeight: 600 }}>{res.day.avgtemp_c}°C</Text>
              </View>
            );
          })
          .slice(0, 3)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    flexGrow: 1,
    color: "white",
    paddingVertical: 50,
  },

  /* #region Head */
  container: {
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 30,
  },
  /* #endregion */

  /* #region Top infos */
  topInfoContainer: {
    paddingVertical: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    aspectRatio: 1,
    marginRight: 10,
  },
  topInfoView: {
    paddingRight: 20,
    alignItems: "flex-end",
    justifyContent: "end",
    gap: 5,
  },
  topInfoViewTemp: {
    fontSize: 50,
    color: "white",
  },
  /* #endregion */

  /* #region Mid infos */
  midInfoContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  midInfoView: {
    marginVertical: 10,
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  midInfoIcon: {
    width: 40,
    aspectRatio: 1,
    marginRight: 10,
  },
  /* #endregion */

  /* #region Bottom infos */
  bottomInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
    paddingHorizontal: "30%",
    gap: 5,
  },

  bottomInfoView: {
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255, .5)",
  },

  bottomWeatherIcon: {
    width: 50,
    aspectRatio: 1,
    marginRight: 10,
  },
  /* #endregion */
});

export default Landing;
