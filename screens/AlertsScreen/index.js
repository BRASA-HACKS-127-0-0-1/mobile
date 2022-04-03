import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SegmentedControlTab from "react-native-segmented-control-tab";
import {getAlerts} from "../../firebase/alert";
import CardAlerts from "./partials/CardAlerts";
import colors from "../../styles/colors";

const AlertsScreen = () => {
    const [listAlertsToday, setListAlertsToday] = React.useState(null);
    const [listAlertsFuture, setListAlertsFuture] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    React.useEffect(() => {
        (async () => {
            try {
                let alerts = await getAlerts();
                setListAlertsToday(alerts);
            } catch (error) {
            }
        })();
    }, []);

    return (
        <>
            <View style={[styles.container, {justifyContent: 'flex-start', paddingTop: 80}]}>
                <View>
                    <SegmentedControlTab
                        values={["Hoje", "Futuro"]}
                        selectedIndex={selectedIndex}
                        onTabPress={(index) => setSelectedIndex(index)}

                        borderRadius={20}
                        tabsContainerStyle={styles.tabsContainerStyle}
                        tabStyle={styles.tabStyle}
                        firstTabStyle={styles.firstTabStyle}
                        lastTabStyle={styles.lastTabStyle}
                        tabTextStyle={styles.tabTextStyle}
                        activeTabStyle={styles.activeTabStyle}
                        activeTabTextStyle={styles.activeTabTextStyle}
                        allowFontScaling={false}
                    />
                </View>
                {(selectedIndex === 0 && listAlertsToday && listAlertsToday.length > 0) ? (
                    listAlertsToday.map((item) => {
                            return (
                                <View key={item.id} style={[styles.card, styles.shadowProp, {borderTopColor: item.aviso_cor, borderTopWidth: 5}]}>
                                    <CardAlerts item={item}/>
                                </View>
                            )
                        }
                    )
                ) : ( selectedIndex === 0 &&
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        marginVertical: 40,
                        color: '#000',
                        textAlign: 'center'
                    }}>Sem alertas no momento.</Text>
                )}
                {(selectedIndex === 1 && listAlertsFuture && listAlertsFuture.length > 0) ? (
                    listAlertsFuture.map((item) => {
                            return (
                                <View key={item.id} style={[styles.card, styles.shadowProp]}>
                                    <CardAlerts item={item}/>
                                </View>
                            )
                        }
                    )
                ) : ( selectedIndex === 1 &&
                    <Text style={{
                        fontSize: 14,
                        fontWeight: 'bold',
                        marginVertical: 40,
                        color: '#000',
                        textAlign: 'center'
                    }}>Sem alertas no momento.</Text>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 20,
        paddingHorizontal: 15,
        width: '100%',
        marginVertical: 10,
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    tabsContainerStyle: {
        paddingHorizontal: 50,
        paddingVertical: 20
    },
    tabTextStyle: {
        fontWeight: "bold",
        color: colors.blue
    },
    activeTabStyle: {
        backgroundColor: colors.blue
    }
});

export default AlertsScreen;