import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Polygon} from 'react-native-maps';
import {StyleSheet, View, Dimensions} from 'react-native';
import * as Location from 'expo-location';
import {getReports} from '../../firebase/report';
import MapActions from './MapActions';
import { getPolygons } from '../../firebase/polygons';

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
    const [polygons, setPolygons] = React.useState([]);
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

    React.useEffect(() => {
        (async () => {
            let reports = await getReports();
            setPoints(reports);
            let poly = await getPolygons();
            console.log("Carregou os poligonos");
            setPolygons(poly);
        })();
    }, []);

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
                onRegionChange={(region) => setRegion(region)}
            >
                {polygons && polygons.length > 0 && 
                    polygons.map((polygon,index) => {
                        console.log('Gerando Polygon');
                        console.log()
                        return (
                            <Polygon
                                key={`polygon-${index}`}
                                coordinates={polygon.shape.slice(0, 10).map(c=>({latitude: c.latitude, longitude: c.longitude}))}
                                strokeColor="#F00"
                                fillColor="rgba(255,0,0,0.5)"
                            />
                        )
                    })
                }
                {/* {points.map((point, index)=> {
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
                })} */}
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