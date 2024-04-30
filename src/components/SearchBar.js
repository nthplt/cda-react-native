import React from "react";
import { TouchableOpacity, FlatList, Image, StyleSheet, TextInput, View, Text } from "react-native";
import { getAutoCompletionSearch } from "../services/weather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SearchBar = ({ setCityFromSearchBar }) => {
  const [searchCityValue, setSearchCityValue] = React.useState("");
  const [results, setResults] = React.useState([]);

  const onSearchCityValueChange = (value) => {
    value.trim().length ? getAutoCompletionSearch(value).then((res) => setResults(res)) : setResults([]);
    setSearchCityValue(value);
  };

  const handleResultSelect = async (selectedResult) => {
    const posSearched = [selectedResult.lat, selectedResult.lon].join(",");
    await AsyncStorage.setItem("lastPos", posSearched);
    setCityFromSearchBar(posSearched);
    setResults([]);
    setSearchCityValue("");
  };

  return (
    <>
      <View style={styles.searchBar}>
        <Image style={styles.searchIcon} source={require("../../assets/images/icons/search.png")} />
        <TextInput style={styles.searchInput} value={searchCityValue} onChangeText={onSearchCityValueChange} placeholder="Rechercher" />
      </View>
      <FlatList
        style={{ backgroundColor: "white", width: "100%" }}
        data={results}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleResultSelect(item)}>
            <Text style={{ padding: 10 }}>
              {item.name}, {item.region}, {item.country}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  searchIcon: {
    height: "100%",
    width: 20,
    aspectRatio: 1,
    marginRight: 10,
  },
});

export default SearchBar;
