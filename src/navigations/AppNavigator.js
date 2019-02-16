import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from '../screens/ListView';
import DetailScreen from '../screens/DetailView';

const AppNavigator = createStackNavigator({
    Home: {
      screen: HomeScreen
    },
    Detail: {
        screen: DetailScreen
    },
  },      
  {
    initialRouteName: "Home"
  }
  );
  
  export default createAppContainer(AppNavigator);