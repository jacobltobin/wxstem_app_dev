# WxSTEM Mobile 3.0 - built on [Cuttlesoft Boilerplate](https://github.com/cuttlesoft/react-native-boilerplate)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

[![Build Status](https://codebuild.us-east-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoidFJBcVo3VitQdmx5dklOWVdxbXdjbnVQdnovdFVJOE5NM3VzZEw4elBCNW9UZmhkR2wrYmNTcUtOVERyS1cxMURiMXEwWUg1RCt5QmJKSVZzdDBWbTRZPSIsIml2UGFyYW1ldGVyU3BlYyI6Ik5EbEZSNHNaZ0dJM1c3ZU0iLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=master)](https://console.aws.amazon.com/codebuild/home?region=us-east-1#/projects/cuttlesoft-boilerplate-mobile/view)

- Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_backward: Using

- [Node v8](https://nodejs.org/en/download/)
- [React Native](https://facebook.github.io/react-native/docs/getting-started.html)
- [Yarn](https://yarnpkg.com/lang/en/docs/install)
- [React Native Dev Tools](https://github.com/facebook/react-devtools/tree/master/packages/react-devtools)

<!-- ## :arrow_up: Quick Start

```sh
# Install dependencies with `yarn`
yarn install

# Build and run for iOS
react-native run-ios

# Build and run for Android
react-native run-android

# Run standalone dev tools
react-devtools
```

## :arrow_forward: Advanced

Once the application is running, you can press '⌘D' in the simulator to open the debug menu. From here, you can access:

- Remote JS Debugging
- Live reload
- Hot Reloading
- ... and more!

### iOS: Specifying a device

You can specify the device the simulator should run with the `--simulator` flag, followed by the device name as a string. The default is `"iPhone 6"`. For exampel, if you wish to run your app on an iPhone 4s, just run `react-native run-ios --simulator="iPhone 4s"`.

The device names correspond to the list of devices available in Xcode. You can check your available devices by running `xcrun simctl list devices` from the console.

## :no_entry_sign: Standard Compliant

This project adheres to Standard. Our CI enforces this, so we suggest you enable linting and auto-formatting to keep your project compliant during development.

## Understanding Linting Errors

The linting rules are from JS Standard and React-Standard. [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```env
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```javascript
import Secrets from 'react-native-config'

Secrets.API_URL // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started

1.  Copy .env.example to .env
2.  Add your config variables
3.  Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4.  Done! -->
