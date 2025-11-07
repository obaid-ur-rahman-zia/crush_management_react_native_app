# Building APK with Environment Variables

This guide explains how to build an APK for your React Native Expo app and handle environment variables.

## Prerequisites

1. **Expo Account**: Create a free account at [expo.dev](https://expo.dev)
2. **EAS CLI**: Already installed globally
3. **Environment Variables**: Configured in `.env` file

## Environment Variables Setup

### 1. Local Development (.env file)

Create a `.env` file in the root directory with your configuration:

```env
# App Configuration
APP_NAME=Crush Management
APP_SLUG=crush_management_react_native_app
APP_SCHEME=crushmanagementreactnativeapp
ANDROID_PACKAGE=com.crushmanagement.app

# WebView Configuration
EXPO_PUBLIC_IFRAME_URL=https://switch2itech-crusher.vercel.app
```

### 2. For EAS Build (Cloud Build)

Environment variables are automatically loaded from your `.env` file during the build process. The `app.config.js` file uses `dotenv` to load these variables.

**Important Notes:**
- Variables prefixed with `EXPO_PUBLIC_` are embedded into the app bundle at build time
- Non-prefixed variables (like `APP_NAME`, `APP_SLUG`) are used in `app.config.js` for build configuration
- Environment variables are read from `.env` file during build

## Building APK

### Option 1: Build on EAS Servers (Recommended)

1. **Login to EAS**:
   ```bash
   eas login
   ```

2. **Configure EAS** (first time only):
   ```bash
   eas build:configure
   ```

3. **Build APK for Production**:
   ```bash
   npm run build:android
   ```
   Or directly:
   ```bash
   eas build --platform android --profile production
   ```

4. **Build APK for Preview/Testing**:
   ```bash
   npm run build:android:preview
   ```
   Or directly:
   ```bash
   eas build --platform android --profile preview
   ```

### Option 2: Build Locally

**Requirements:**
- Android Studio installed
- Android SDK configured
- Java JDK installed

**Build Command:**
```bash
npm run build:android:local
```
Or directly:
```bash
eas build --platform android --local --profile production
```

## How Environment Variables Work in APK

### Build Time Variables (app.config.js)
- `APP_NAME` - Sets the app display name
- `APP_SLUG` - Sets the app slug
- `APP_SCHEME` - Sets the URL scheme for deep linking
- `ANDROID_PACKAGE` - Sets the Android package name (e.g., `com.crushmanagement.app`)

These are used when generating the native app configuration.

### Runtime Variables (React Components)
- `EXPO_PUBLIC_IFRAME_URL` - Available in your React components via `process.env.EXPO_PUBLIC_IFRAME_URL`

**Important**: These variables are embedded at build time. To change them, you need to rebuild the APK.

## Changing Environment Variables for Different Builds

### Method 1: Update .env File
Simply update your `.env` file and rebuild:
```bash
# Edit .env file with new values
npm run build:android
```

### Method 2: Use EAS Secrets (for sensitive data)
For sensitive environment variables, use EAS secrets:

```bash
# Set a secret
eas secret:create --scope project --name EXPO_PUBLIC_IFRAME_URL --value "https://your-url.com" --type string

# List secrets
eas secret:list

# Delete a secret
eas secret:delete --name EXPO_PUBLIC_IFRAME_URL
```

Secrets are automatically available during builds.

### Method 3: Override in eas.json
You can override environment variables in `eas.json` for specific build profiles:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_IFRAME_URL": "https://production-url.com"
      }
    },
    "staging": {
      "env": {
        "EXPO_PUBLIC_IFRAME_URL": "https://staging-url.com"
      }
    }
  }
}
```

## Downloading the APK

After the build completes:

1. **EAS Build Dashboard**: 
   - Go to [expo.dev](https://expo.dev)
   - Navigate to your project
   - Click on "Builds"
   - Download the APK from the completed build

2. **Command Line**:
   ```bash
   eas build:list
   eas build:download [build-id]
   ```

3. **Email Link**: EAS will send you an email with the download link when the build completes.

## Installing the APK

1. Transfer the APK to your Android device
2. Enable "Install from Unknown Sources" in Android settings
3. Open the APK file and install

## Troubleshooting

### Environment Variables Not Working

1. **Check .env file exists** in the root directory
2. **Verify variable names** - Use `EXPO_PUBLIC_` prefix for client-side variables
3. **Rebuild the app** - Environment variables are embedded at build time
4. **Check app.config.js** - Ensure `dotenv/config` is imported at the top

### Build Fails

1. **Check EAS status**: `eas build:list`
2. **View build logs**: Click on the build in the EAS dashboard
3. **Verify .env file**: Ensure all required variables are set
4. **Check app.config.js**: Ensure syntax is correct

### APK Not Installing

1. **Enable Unknown Sources**: Settings → Security → Unknown Sources
2. **Check Android version**: Ensure device supports the minimum SDK version
3. **Clear cache**: Uninstall previous versions first

## Best Practices

1. **Never commit .env file**: It's already in `.gitignore`
2. **Use .env.example**: Keep a template for other developers
3. **Use EAS Secrets**: For sensitive production variables
4. **Version control**: Keep `eas.json` and `app.config.js` in version control
5. **Test builds**: Always test preview builds before production

## Quick Reference

```bash
# Login to EAS
eas login

# Configure project (first time)
eas build:configure

# Build production APK
npm run build:android

# Build preview APK
npm run build:android:preview

# Build locally
npm run build:android:local

# View builds
eas build:list

# Download APK
eas build:download [build-id]
```

## Support

For more information, visit:
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Environment Variables Guide](https://docs.expo.dev/guides/environment-variables/)
- [EAS Build Status](https://status.expo.dev/)

