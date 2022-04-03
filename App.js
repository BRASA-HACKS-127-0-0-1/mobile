import { NavigationContainer } from '@react-navigation/native';
import MapScreen from './screens/MapScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from './styles/colors';
import NewsScreen from './screens/NewsScreen';
import AlertsScreen from './screens/AlertsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Mapa':
                iconName = focused 
                ? 'map'
                : 'map-outline';
                break;
              case 'Notícias':
                iconName = focused 
                ? 'newspaper'
                : 'newspaper-outline';
                break;
              case 'Notificações':
                iconName = focused 
                ? 'notifications'
                : 'notifications-outline';
                break;
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.blue,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="Notícias" component={NewsScreen} />
        <Tab.Screen name="Notificações" component={AlertsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}