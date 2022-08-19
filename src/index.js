import { NativeModules, Platform } from 'react-native';

const BatteryOptimizationCheck =
  Platform.OS === 'android' ? NativeModules.BatteryOptimizationCheck : null;

export function BatteryOptEnabled() {
  if (Platform.OS === 'android') {
    //* Android only returns function
    return BatteryOptimizationCheck.isBatteryOptEnabled();
  }
  return Promise.resolve(false);
}

export function RequestDisableOptimization() {
  if (Platform.OS === 'android') {
    //* Android only returns function
    BatteryOptimizationCheck.openRequestDisableOptimization();
  }
  return;
}

export function OpenOptimizationSettings() {
  if (Platform.OS === 'android') {
    //* Android only returns function
    BatteryOptimizationCheck.openOptimizationSettings();
  }
  return;
}
