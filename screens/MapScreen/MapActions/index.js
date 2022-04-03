import Ionicons from '@expo/vector-icons/Ionicons';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import {FloatingAction} from "react-native-floating-action";
import colors from '../../../styles/colors';
import marker from '../../../assets/icons/marker.png';
import {addReport} from "../../../firebase/report";

const MapActions = ({region, updatePoints}) => {
    const [reportType, setReportType] = useState(null);
    const [levelSelected, setLevelSelected] = useState(null);

    useEffect(() => {
        if (!reportType) {
            setLevelSelected(null);
        }
    }, [reportType]);

    const mapReportOptions = [
        {
            title: "Alagamento",
            icon: require("../../../assets/icons/flood.png"),
            position: 1,
            name: "flood",
            levelsOptions: [{
                title: "Baixo",
                weight: 10,
            }, {
                title: "Médio",
                weight: 20,
            }, {
                title: "Alto",
                weight: 30,
            }]
        },
        {
            title: "Deslizamento",
            icon: require("../../../assets/icons/landslide.png"),
            position: 2,
            name: "landslide",
            levelsOptions: [{
                title: "Baixo",
                weight: 10,
            }, {
                title: "Médio",
                weight: 20,
            }, {
                title: "Alto",
                weight: 30,
            }]
        },
        {
            title: "Chuva Forte",
            icon: require("../../../assets/icons/rain.png"),
            position: 3,
            name: "rain",
            levelsOptions: [{
                title: "Baixo",
                weight: 10,
            }, {
                title: "Médio",
                weight: 20,
            }, {
                title: "Alto",
                weight: 30,
            }]
        },
    ];

    const confirmReport = useCallback(async () => {
        if (!reportType) {
            Alert.alert("Selecione um tipo de reporte");
            return;
        }
        if (!levelSelected) {
            Alert.alert("Selecione um nível de reporte");
            return;
        }
        const report = {
            descricao: reportType.title,
            latitude: region.latitude,
            longitude: region.longitude,
            weight: levelSelected.weight
        }
        try {
            await addReport(report);
            updatePoints(report)
            Alert.alert(`Reporte de ${reportType.title}`, `Nível: ${levelSelected.title}`);
        } catch (e) {
            Alert.alert("Não foi possível registrar seu report nesse momento.")
        }
        setLevelSelected(null);
        setReportType(null);

    }, [reportType, levelSelected])
    if (reportType) {
        return (
            <>
                <View style={styles.markerFixed}>
                    <Image style={styles.marker} source={marker}/>
                </View>
                <View style={{position: 'absolute', bottom: 0, backgroundColor: 'white', width: '100%'}}>
                    <View style={{flex: 1, padding: 16}}>
                        <View style={{alignItems: 'flex-end'}}>
                            <TouchableOpacity onPress={() => setReportType(null)}>
                                <Ionicons name={"close"} size={30} color={'#000'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 16}}>{reportType.title}</Text>
                            <Text style={{fontSize: 14, fontWeight: 'bold', marginBottom: 16}}>Nível do Reporte:</Text>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                                {reportType.levelsOptions.map((level) => (
                                    <TouchableOpacity key={level.title} onPress={() => setLevelSelected(level)} style={[{
                                        height: 50,
                                        width: 50,
                                        borderRadius: '50%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'gray'
                                    }, levelSelected && levelSelected.title === level.title ? {
                                        borderColor: colors.orange,
                                        borderWidth: "3px"
                                    } : {}]}>
                                        <Text style={{
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            color: 'white'
                                        }}>{level.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={{flex: 1, marginTop: 20, alignItems: 'center'}}>
                                <TouchableOpacity onPress={confirmReport} disabled={!levelSelected} style={[{
                                    backgroundColor: colors.orange,
                                    padding: 16,
                                    width: '100%',
                                    alignItems: 'center',
                                    borderRadius: 8
                                }, !levelSelected ? {opacity: 0.5} : {}]}>
                                    <Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>CONFIRMAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </>)
    }
    return (<FloatingAction
        actions={mapReportOptions}
        onPressItem={name => {
            setReportType(mapReportOptions.find(option => option.name === name));
        }}
        overlayColor={'rgba(255,255,255,0.0)'}
    />);
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: '80%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    markerFixed: {
        position: 'absolute',
    },
    marker: {
        width: 40,
        height: 40,
    },
    optionsContainer: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'red',
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    optionItem: {
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: colors.orange,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default MapActions;