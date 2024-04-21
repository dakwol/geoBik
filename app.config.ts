import { ExpoConfig } from '@expo/config-types';
import { ConfigPlugin, withAppDelegate } from 'expo/config-plugins';

const config: ExpoConfig = {
  name: "БИК ГЕО",
  slug: "geoBik",
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  plugins: [
    [
      'expo-media-library',
      {
        photosPermission: 'Разрешите БИК ГЕО получить доступ к вашим фотографиям.',
        savePhotosPermission: 'Позволяет БИК ГЕО сохранять фотографии.',
        isAccessMediaLocationEnabled: true,
      },
    ]
  ],
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSPhotoLibraryUsageDescription: 'Разрешите БИК ГЕО получить доступ к вашим фотографиям.',
      NSPhotoLibraryAddUsageDescription: 'Позволяет БИК ГЕО сохранять фотографии.',
      NSContactsUsageDescription: 'Разрешите БИК ГЕО олучить доступ к вашим контактам.',
    },
    bundleIdentifier: "geoBik.com"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#ffffff',
    },
    permissions: [
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.ACCESS_MEDIA_LOCATION',
      'android.permission.READ_CONTACTS',
      'android.permission.WRITE_CONTACTS',
    ],
    package: 'geoBik.com',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    mapKitApiKey: '1f4fe73b-c132-431c-928d-3c95d9448e78', // Add your Yandex Maps API key here
    eas: {
      "projectId": "4ed8c1f4-1c7c-4e1d-aeac-a719b436411e"
    }
  },
};


export default config;
