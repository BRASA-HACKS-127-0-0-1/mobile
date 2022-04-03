import * as React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import * as Location from 'expo-location';
import { FloatingAction } from "react-native-floating-action";
import MapActions from './MapActions';
import marker from '../../assets/icons/marker.png';

export default function MapScreen() {
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const [points, setPoints] = React.useState([]);
  const [region, setRegion] = React.useState({
    latitude: -22.5046,
    longitude: -43.17861,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const mapRef = React.useRef();

  React.useEffect(() => {
    (async () => {
      try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status)
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLocation(null);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      setLocation(null);
    }
    })();
  }, []);

  React.useEffect(() => {
    mapRef.current.setMapBoundaries({latitude: -22.409190077590846, longitude: -43.150089186564614}, {latitude: -22.56470395707823, longitude: -43.25086811053996});
  },[mapRef]);


  const updatePoints = React.useCallback((report) => {
    setPoints([...points, report]);
  },[points]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: -22.5046,
          longitude: -43.17861,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        minDelta={0.01}
        minZoomLevel={14}
        ref={mapRef}
        onRegionChange={(region)=>  setRegion(region)}
       >

        <MapView.Heatmap 
          points={points}
          opacity={1}
          radius={20}
          maxIntensity={100}
          gradientSmoothing={10}
          heatmapMode={"POINTS_DENSITY"}
        />
       </MapView>         
       <MapActions region={region} updatePoints={updatePoints}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});