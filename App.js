import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import pages
import HomeScreen from "./pages/HomeScreen";
import DisplayClientFolder from "./pages/DisplayClientFolder";
import AddPrestation from "./pages/AddPrestation";

const Stack = createNativeStackNavigator();

// App entry point
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Accueil" component={HomeScreen} />
          <Stack.Screen name="Dossier Client" component={DisplayClientFolder} />
          <Stack.Screen name="Prestation" component={AddPrestation} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
