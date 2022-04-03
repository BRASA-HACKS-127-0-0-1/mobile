import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import colors from '../../../styles/colors';
const MapActions = () => {
  const [modalLevelVisible, setModalLevelVisible] = useState(false);
  const [reportType, setReportType] = useState(null);
  const mapReportOptions = [
    {
      text: "Alagamento",
      icon: require("../../../assets/icons/flood.png"),
      position: 1,
      name: "flood", 
      levelsOptions: [{
        text: "Baixo",
      },{
        text: "Médio",
      },{
        text: "Alto",
      }]
    },
    {
      text: "Deslizamento",
      icon: require("../../../assets/icons/landslide.png"),
      position: 2,
      name: "landslide", 
      levelsOptions: [{
        text: "Baixo",
      },{
        text: "Médio",
      },{
        text: "Alto",
      }]
    },
    {
      text: "Chuva",
      icon: require("../../../assets/icons/rain.png"),
      position: 3,
      name: "rain", 
      levelsOptions: [{
        text: "Baixo",
      },{
        text: "Médio",
      },{
        text: "Alto",
      }]
    },
  ];
  return (
  <>
    <View style={{ postion: "absolute", backgroundColor:'red', top: 0, left: 0}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalLevelVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalLevelVisible(!modalLevelVisible);
        }}>
        {reportType && (
          <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Gravidade do {reportType.text}</Text>
            <View style={styles.optionsContainer}>
              {reportType.levelsOptions.map((level, index) => (
                <View style={styles.optionItem}><Text>{level.text}</Text></View>
              ))}
            </View>
          </View>
        </View>
        )}
      </Modal>
    </View>
    <FloatingAction
      actions={mapReportOptions}
      onPressItem={name => {
        console.log(mapReportOptions.find(option => option.name === name))
        setReportType(mapReportOptions.find(option => option.name === name));
        setModalLevelVisible(true);
      }}
      overlayColor={'rgba(255,255,255,0.0)'}
    />
  </>);
}
const styles = StyleSheet.create({
  centeredView : {
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
  },
  optionItem: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: colors.orange,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default MapActions;