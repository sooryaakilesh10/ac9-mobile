#!/bin/bash
set -e

APP_NAME="MyApp"
APP_ID="com.myapp.demo"
ANDROID_SDK_ROOT="$HOME/android-sdk"
CMDLINE_TOOLS="$ANDROID_SDK_ROOT/cmdline-tools/latest"
GRADLEW="./android/gradlew"

echo "🚀 Building APK for $APP_NAME ($APP_ID)"

# Step 1: Install deps & build React app
echo "📦 Installing dependencies & building React app..."
npm install
npm run build

# Step 2: Sync with Capacitor
echo "🔄 Syncing with Capacitor Android..."
npx cap sync android

# Step 3: Setup ANDROID_HOME
if [ ! -d "$ANDROID_SDK_ROOT" ]; then
  echo "📥 Downloading Android SDK..."
  mkdir -p "$ANDROID_SDK_ROOT"
  cd "$ANDROID_SDK_ROOT"
  curl -LO https://dl.google.com/android/repository/commandlinetools-mac-9477386_latest.zip
  unzip commandlinetools-mac-9477386_latest.zip -d "$ANDROID_SDK_ROOT"
  mkdir -p "$CMDLINE_TOOLS"
  mv "$ANDROID_SDK_ROOT/cmdline-tools/"* "$CMDLINE_TOOLS" || true
  cd -
fi

export ANDROID_HOME="$ANDROID_SDK_ROOT"
export PATH="$CMDLINE_TOOLS/bin:$PATH"
export PATH="$ANDROID_HOME/platform-tools:$PATH"

echo "✅ ANDROID_HOME set to $ANDROID_HOME"

# Step 4: Install required SDKs
echo "📥 Installing required Android packages..."
yes | sdkmanager --licenses >/dev/null
sdkmanager "platform-tools" "platforms;android-34" "build-tools;34.0.0" >/dev/null

# Step 5: Build APK with Gradle
echo "🏗️ Building APK..."
cd android
chmod +x gradlew
./gradlew assembleDebug
cd ..

APK_PATH="android/app/build/outputs/apk/debug/app-debug.apk"

if [ -f "$APK_PATH" ]; then
  echo "✅ APK built successfully: $APK_PATH"
else
  echo "❌ APK build failed"
  exit 1
fi
