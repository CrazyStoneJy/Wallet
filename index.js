/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/router';
import {name as appName} from './app.json';
import costStorageManager from './src/pages/home/cost_storage_manger';

// 从数据库中拉取消费数据
costStorageManager.init();

AppRegistry.registerComponent(appName, () => App);
