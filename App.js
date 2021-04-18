/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StatusBar, Text} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {enableScreens} from 'react-native-screens';

import {Icon, Box} from 'components';
import {Main} from 'navigation';
import {Splash} from 'screens/Splash';
import configureStore from './store';
import theme from 'constants/theme/default';
import {SafeAreaView} from 'react-native-safe-area-context';
import SwipeButton from 'rn-swipe-button';

enableScreens();

const {store, persistor} = configureStore();
function SetCustomText(customProps) {
  const TextRender = Text.render;
  const initialDefaultProps = Text.defaultProps;
  Text.defaultProps = {
    ...initialDefaultProps,
    ...customProps,
  };
  Text.render = function render(props) {
    let oldProps = props;
    props = {...props, style: [customProps.style, props.style]};
    try {
      return TextRender.apply(this, arguments);
    } finally {
      props = oldProps;
    }
  };
}

const TextProps = {
  style: {
    // color: 'blue',
    fontFamily: 'Hurme Geometric Sans 2',
    fontSize: 14,
  },
};
SetCustomText(TextProps);
const App = () => {
  const [done, setDone] = React.useState(false);
  // const thumbIcon = () => {
  //   return (
  //     <Box backgroundColor="mostBg">
  //       <Icon name="icon-forward" size={14} />
  //     </Box>
  //   );
  // };
  // return (
  //   <Provider store={store}>
  //     <PersistGate loading={null} persistor={persistor}>
  //       <ThemeProvider theme={theme}>
  //         <StatusBar
  //           barStyle="dark-content"
  //           // theme background of app
  //           backgroundColor="rgba(48,188,237,0.1)"
  //         />
  //         <SafeAreaView>
  //           <SwipeButton
  //             disabled={false}
  //             //disable the button by doing true (Optional)
  //             swipeSuccessThreshold={70}
  //             height={62}
  //             containerStyles={{borderWidth: 5}}
  //             //height of the button (Optional)
  //             width={'75%'}
  //             //width of the button (Optional)
  //             title="Swipe to Submit"
  //             //Text inside the button (Optional)
  //             thumbIconComponent={thumbIcon}
  //             //You can also set your own icon for the button (Optional)
  //             onSwipeSuccess={() => {
  //               alert('Submitted Successfully!');
  //             }}
  //             successTitle="loading"
  //             //After the completion of swipe (Optional)
  //             railFillBackgroundColor="#3DAA9D" //(Optional)
  //             railFillBorderColor="#3DAA9D" //(Optional)
  //             thumbIconBackgroundColor="rgba(61,170,157, 0.1)" //(Optional)
  //             shouldResetAfterSuccess
  //             // thumbIconBorderColor="#ed9aff" //(Optional)
  //             railBackgroundColor="#023248" //(Optional)
  //             railBorderColor="transparent" //(Optional)
  //             titleColor="#3DAA9D"
  //             titleStyles={{color: '#3DAA9D', textAlign: 'right', fontSize: 12}}
  //           />
  //         </SafeAreaView>
  //       </ThemeProvider>
  //     </PersistGate>
  //   </Provider>
  // );
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <StatusBar
            barStyle="dark-content"
            // theme background of app
            backgroundColor="rgba(48,188,237,0.1)"
          />
          {__DEV__ ? <Main /> : done ? <Main /> : <Splash {...{setDone}} />}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
