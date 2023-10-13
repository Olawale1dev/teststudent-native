import { registerRootComponent } from 'expo';
import { name as appName } from './app.json';
import { initialize } from 'react-native-fbads';
import App from './App';



initialize();
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
AppRegistry.registerComponent(appName, () => YourRootComponent);
//registerRootComponent(App);
