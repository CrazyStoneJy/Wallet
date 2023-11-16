/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/router';
import {name as appName} from './app.json';
import SQLite from 'react-native-sqlite-storage';
import { init } from './src/task/init';


// SQLite.DEBUG(true);
SQLite.enablePromise(false);

init();

AppRegistry.registerComponent(appName, () => App);
