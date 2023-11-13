/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/router';
import {name as appName} from './app.json';
import SQLite from 'react-native-sqlite-storage';
// import costStorageManager from './src/pages/home/cost_storage_manger';

// 从数据库中拉取消费数据
// costStorageManager.init();
SQLite.DEBUG(true);
SQLite.enablePromise(false);

AppRegistry.registerComponent(appName, () => App);
