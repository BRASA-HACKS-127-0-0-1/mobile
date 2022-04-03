import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import Collapsible from 'react-native-collapsible';


const CardAlerts = ({item}) => {
    const [isCollapsed, setCollapsed] = React.useState(true)
    const initDate = new Date(item.data_inicio);
    const endDate = new Date(item.data_fim);
    const options = { weekday: undefined, year: undefined, month: 'long', day: 'numeric' };

    return (
        <>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {item.descricao}
                <Text style={{fontWeight: 'normal', fontSize: 16}}> - {item.severidade}</Text>
            </Text>
            <Text style={{fontSize: 16, marginTop: 8}}>{initDate.toLocaleString('pt-BR', options)} - {endDate.toLocaleString('pt-BR', options)}</Text>
            <Text style={{fontSize: 16, marginTop: 8}}>{item.hora_inicio} - {item.hora_fim}</Text>
            <View>
                <TouchableOpacity
                    style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => setCollapsed(!isCollapsed)}
                >
                    <Ionicons name={isCollapsed ? 'caret-forward' : 'caret-down'} color={'#000'} size={16}/>
                    <Text style={{fontSize: 18}}>Instruções</Text>
                </TouchableOpacity>
                <Collapsible collapsed={isCollapsed}>
                    {item.instrucoes.map((inst) => {
                        return (<Text style={{marginTop: 10, fontSize: 16}}>- {inst}</Text>)
                    })
                    }
                </Collapsible>
            </View>
        </>
    );
}

const styles = StyleSheet.create({});

export default CardAlerts;