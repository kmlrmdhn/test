import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginClient, LoginReg, Register, SplashScreen, Home } from '../../containers/pages';




const Router = createStackNavigator({

  LoginReg,
  Register,
  LoginClient,


},

  {
    headerMode: 'none',

  },

);
const HomeStack = createStackNavigator({
  Home
}, {
  headerMode: 'none'
},

)





const Switch = createSwitchNavigator({

  SplashScreen,
  Router,
  HomeStack,
});



export default createAppContainer(Switch);

// export default withNavigation(Switch);