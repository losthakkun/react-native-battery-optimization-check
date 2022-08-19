package com.reactnativebatteryoptimizationcheck;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import android.annotation.SuppressLint;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.content.Intent;
import android.os.PowerManager;
import android.provider.Settings;

@ReactModule(name = BatteryOptimizationCheckModule.NAME)
public class BatteryOptimizationCheckModule extends ReactContextBaseJavaModule {
    public static final String NAME = "BatteryOptimizationCheck";

    private final ReactApplicationContext reactContext;

    public BatteryOptimizationCheckModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void isBatteryOptEnabled(Promise promise) {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            String packageName = reactContext.getPackageName();
            PowerManager pm = (PowerManager) reactContext.getSystemService(Context.POWER_SERVICE);
            if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                promise.resolve(true);
                return;
            }
        }
        promise.resolve(false);
    }

    @SuppressLint("BatteryLife")
    @ReactMethod
    public void openRequestDisableOptimization() {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            String packageName = reactContext.getPackageName();
            Intent intent = new Intent();
            intent.setAction(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
            intent.setData(Uri.parse("package:" + packageName));
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
        }
    }

    @ReactMethod
    public void openOptimizationSettings() {
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            String packageName = reactContext.getPackageName();
            Intent intent = new Intent();
            intent.setAction(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS);
            intent.setData(Uri.parse("package:" + packageName));
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            reactContext.startActivity(intent);
        }
    }

}
