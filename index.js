// App entry: Expo Router, plus the headless task behind the home-screen
// widget and the Quick Settings tile, which must be registered before any UI.
import 'expo-router/entry';
import { registerWidgetTaskHandler } from 'react-native-android-widget';
import { widgetTaskHandler } from './widgets/task-handler';

registerWidgetTaskHandler(widgetTaskHandler);
