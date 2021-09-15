import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapLocation, setMapLocation] = useState({});
  const [tapPosition, setTapPosition] = useState(null);
  const initialPosition = {
    latitude: 35,
    longitude: 136,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync();
      setLocation(location);
      setMapLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);
  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={initialPosition}
        showsUserLocation={true}
        showsMyLocationButton={true}
        //showsTraffic={true}
        showsScale={true}
        animateToRegion={() => ({ region: mapLocation })}
        onPress={(e) => {
          setTapPosition({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
          //setModalVisible(true);
        }}
      />
      <Text>Latitude:{tapPosition?.latitude}</Text>
      <Text>Longtitude:{tapPosition?.longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: "100%",
    height: "90%",
  },
  paragraph: {
    marginTop: 30,
    paddingTop: 30,
  },
});
