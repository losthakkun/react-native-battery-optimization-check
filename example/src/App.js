import * as React from 'react';

import {
  View,
  Text,
  Button,
  AppState,
  Platform,
  StyleSheet,
} from 'react-native';
import {
  BatteryOptEnabled,
  OpenOptimizationSettings,
  RequestDisableOptimization,
} from 'react-native-battery-optimization-check';

const OS = Platform.OS;

export default function App() {
  const appState = React.useRef(AppState.currentState);
  const [batteryOpt, setBatteryOpt] = React.useState(false);

  //* React.useEffect is used to run code after the component is mounted
  React.useEffect(() => {
    const listener = AppState.addEventListener('change', _handleAppState);
    checkBatteryOpt();
    return () => {
      listener.remove();
    };
  }, [_handleAppState, checkBatteryOpt]);

  //* Handle App State Change
  const _handleAppState = React.useCallback(
    (nextAppState) => {
      if (appState.current.match(/inactive|background/)) {
        //* If App is in background
        console.log('App is going to background');
      }
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        //* App has come to the foreground
        console.log('App has come to the foreground!');
        //* Check if battery optimization is enabled before the modal of request is closed
        checkBatteryOpt();
      }
      //* Update app state
      appState.current = nextAppState;
    },
    [checkBatteryOpt]
  );

  //* Check if battery optimization is enabled
  const checkBatteryOpt = React.useCallback(() => {
    BatteryOptEnabled().then((isEnabled) => {
      //* Set state from promise result
      setBatteryOpt(isEnabled);
    });
  }, []);

  //* Request permission to disable battery optimization on Android
  const _requestDisableBatteryOpt = () => {
    RequestDisableOptimization();
  };

  //* Open battery optimization settings on Android to enable/disable battery optimization
  const _openOptimizationSettings = () => {
    OpenOptimizationSettings();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {' '}
        React Native Battery Optimization Check{' '}
      </Text>
      <Text style={styles.body}>
        Battery Optimization: {batteryOpt ? 'Enabled' : 'Disabled'}
      </Text>
      {batteryOpt && (
        <Button
          title="Disable Battery Optimization"
          onPress={_requestDisableBatteryOpt}
        />
      )}
      <Button
        title="Open Battery Optimization List"
        onPress={_openOptimizationSettings}
      />
      {OS === 'ios' && (
        <Text style={styles.body}>
          {' '}
          iOS does not support battery optimization{' '}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
  },
  body: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
    color: '#FFF',
  },
});
