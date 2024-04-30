import { StyleSheet } from "react-native";
import Landing from "./src/components/Landing";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <LinearGradient
      colors={["#0000FF", "#ADD8E6"]} // couleurs du dégradé de haut en bas
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Landing />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
