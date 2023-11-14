/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/router';
import {name as appName} from './app.json';
import SQLite from 'react-native-sqlite-storage';


// SQLite.DEBUG(true);
SQLite.enablePromise(false);

AppRegistry.registerComponent(appName, () => App);
