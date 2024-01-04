import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/UI/OutlinedButton";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import { fetchPlaceById } from "../util/database";

function PlaceDetails({ route, navigation }) {
  const [loadedPlace, setLoadedPlace] = useState();

  function showOnMapHandler() {}

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlace() {
      const fetchedPlace = await fetchPlaceById(selectedPlaceId);
      setLoadedPlace(fetchedPlace);
      navigation.setOptions({
        title: fetchedPlace.title,
      });

      console.log(fetchedPlace);
    }

    loadPlace();
  }, [selectedPlaceId]);

  if (!loadedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: loadedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{loadedPlace.address}</Text>
        </View>
        <OutlinedButton icon='map' onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
