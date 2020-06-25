/**
 * @format
 */

//import {AppRegistry} from 'react-native';
//import App from './App';
//import {name as appName} from './app.json';
//AppRegistry.registerComponent(appName, () => App);

import { Navigation } from "react-native-navigation";
import Detail from "./src/container/Detail";
import List from "./src/container/List";


Navigation.registerComponent('List', () => List);
Navigation.registerComponent('Detail', () => Detail);


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'List'
            }
          }
        ]
      }
    }
  });
});