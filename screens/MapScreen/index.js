import * as React from 'react';
import { PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {StyleSheet, View, Dimensions} from 'react-native';
import * as Location from 'expo-location';
import {getReports} from '../../firebase/report';
import MapActions from './MapActions';
import MapView from "react-native-map-clustering";

export default function MapScreen() {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);

    const {width, height} = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const mapsBoundaries = {
        nw: [-22.471493728332902, -43.1235671880782],
        so: [-22.56470395707823, -43.25086811053996]
    }

    const [points, setPoints] = React.useState([]);
    const [region, setRegion] = React.useState({
        latitude: (mapsBoundaries.nw[0] + mapsBoundaries.so[0]) / 2,
        longitude: (mapsBoundaries.nw[1] + mapsBoundaries.so[1]) / 2,
        latitudeDelta: mapsBoundaries.nw[0] - mapsBoundaries.so[0],
        longitudeDelta: (mapsBoundaries.nw[0] - mapsBoundaries.so[0]) * ASPECT_RATIO,
    });
    const mapRef = React.useRef();

    React.useEffect(() => {
        (async () => {
            try {
                let {status} = await Location.requestForegroundPermissionsAsync();
                console.log(status)
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    setLocation(null);
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);

                let reports = await getReports();
                setPoints(reports);
            } catch (error) {
                setLocation(null);
            }
        })();
    }, []);

    React.useEffect(() => {
        mapRef.current.setMapBoundaries(
            {latitude: mapsBoundaries.nw[0], longitude: mapsBoundaries.nw[1]},
            {latitude: mapsBoundaries.so[0], longitude: mapsBoundaries.so[1]}
        );
    }, [mapRef]);


    const updatePoints = React.useCallback((report) => {
        setPoints([...points, report]);
    }, [points]);

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
                initialRegion={region}
                minDelta={0.01}
                minZoomLevel={13}
                ref={mapRef}
                radius={40}
                clusterColor={'red'}
                onRegionChange={(region) => setRegion(region)}
            >
                {points.map((point, index)=> {
                    let image = null;
                    switch(point.descricao) {
                        case 'Deslizamento': {
                            image = require('../../assets/icons/markers/landslide.png');
                            break;
                        }
                        case 'Chuva Forte': {
                            image = require('../../assets/icons/markers/rain.png');
                            break;
                        }
                        case 'Alagamento': {
                            image = require('../../assets/icons/markers/flood.png');
                            break;
                        }
                    }
                    return <Marker key={`point-${index}`} coordinate={{latitude: point.latitude, longitude: point.longitude}}
                    icon={image}
                    /> 
                })}
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