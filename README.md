# react-native-battery-optimization-check
A react-native solution to check if your app runs under battery optimization on Android devices and makes it easy for the user to disable it.

Base on [@rasheedk/react-native-disable-battery-optimizations-android](https://github.com/rasheedk/react-native-disable-battery-optimizations-android) which is no longer supported in react-native >= 0.63.0

## Why?

Android devices with API level greater than 23 (Android 6 — Marshmallow) comes with a battery optimization feature in an attempt to reduce battery consumption.

This feature implements a Doze mode which prevents the continuous use of resources by applications while the device is on Standby.

## Doze mode and App Standby

If a user leaves a device unplugged and stationary for a period of time, with the screen off, the device enters Doze mode. In Doze mode, the system attempts to conserve battery by restricting apps’ access to network and CPU-intensive services.

<p align="center">
  <img src="./src/img/doze.png" alt="Sublime's custom image"/>
</p>

##### Photo from Android developer website

<br>

At the conclusion of each maintenance window, the system again enters Doze, suspending network access and deferring jobs, syncs, and alarms. Over time, the system schedules maintenance windows less and less frequently, helping to reduce battery consumption in cases of longer-term inactivity when the device is not connected to a charger.

As soon as the user wakes the device by moving it, turning on the screen, or connecting a charger, the system exits Doze and all apps return to normal activity. 

Here is the list of main restrictions that apply to your application in doze mode:

- The system ignores wake locks;
- A network connection is not available;
- The system doesn’t perform WiFi, WiFi RTT, and BLE scans;
- Standard AlarmManager alarms will be rescheduled;
- The system doesn’t allow JobScheduler and WorkManager.

Read more about [Optimize for Doze and App Standby](https://developer.android.com/training/monitoring-device-state/doze-standby).

## Battery optimization

Battery optimization allows you to put your app into the whitelist. By default, it is turned off. Apps available in the whitelist are partially exempt from Doze and App Standby optimizations. This doesn’t mean they have full access to and could perform tasks during the doze mode. An app that is whitelisted can use the network and hold partial wake locks during Doze and App Standby. However, other restrictions like jobs being differed, standard alarm triggers are still imposed.

<br>

# Installation

```sh
$ yarn add react-native-battery-optimization-check
```

Link is automatic on react native >= 0.60

### For manual linking :

```sh
$ react-native link react-native-battery-optimization-check
```

# Usage

There are 3 functions on this library:

## BatteryOptEnabled()

- Returns ***true*** if battery optimization is enabled for your app.
- Returns ***false*** if battery optimization is disabled for your app.
- Returns ***false*** if battery optimization is not available on the device or if the app is not running on Android.

<br>

Example:
```js
import { BatteryOptEnabled } from "react-native-battery-optimization-check";

BatteryOptEnabled().then((isEnabled)=>{
	// returns promise<boolean>
	const result = isEnabled ? "enabled" : "disabled";
	// ...
});
```

## OpenOptimizationSettings()

- This function is only available on Android devices with API level greater than 23 (Android 6 — Marshmallow).
- Opens the battery optimization settings page with a list of all apps that are available in the whitelist. You can also add or remove apps from the whitelist.
- This method uses an intent with ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS which is allowed to publish your app in Playstore without restrictions in this regard.

<br>

Example:
```js
import { OpenOptimizationSettings, BatteryOptEnabled } from "react-native-battery-optimization-check";

BatteryOptEnabled().then((isEnabled)=>{
	// returns promise<boolean>
	if (isEnabled) {
		// if battery optimization is enabled, request to disable it.
		OpenOptimizationSettings();
		// ...
	}
});
```

## RequestDisableOptimization()

**CAUTION!** Google Play policies prohibit apps from requesting direct exemption from Power Management features in Android 6.0+ (Doze and App Standby) unless the core function of the app is adversely affected.

Read more about [Acceptable use cases for exemption](https://developer.android.com/training/monitoring-device-state/doze-standby#exemption-cases).

- This function is only available on Android devices with API level greater than 23 (Android 6 — Marshmallow).
- This function will request the user to disable battery optimization for your app.
- A system dialog will be shown to the user to disable battery optimization directly from the app.

<br>

Example:
```js
import { RequestDisableOptimization, BatteryOptEnabled } from "react-native-battery-optimization-check";

BatteryOptEnabled().then((isEnabled)=>{
	// returns promise<boolean>
	if (isEnabled) {
		// if battery optimization is enabled, request to disable it.
		RequestDisableOptimization();
		// ...
	}
});
```

# Example App

In order to run the example app, you need to install the library and then go to the /example folder and run the following commands:

1. instal and link node_modules
	```sh
	$ yarn
	```

2. run the app
	```sh
	$ react-native run-android
	```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
