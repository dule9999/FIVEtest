/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { View } from '../components/Themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import SearchScreen from '../screens/Search';
import DetailsScreen from '../screens/Details';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { ReduxProvider } from '../redux/store';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <ReduxProvider>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Details" component={DetailsScreen}/>
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      </Stack.Navigator>
    </ReduxProvider>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
