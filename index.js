// ✅ 최상단에 defaultProps 먼저 설정
import { Text, TextInput } from 'react-native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

// ⬇️ 이제야 App을 import
import { AppRegistry } from 'react-native';
import App from './src/App';  // App 불러오기 전에 defaultProps는 이미 적용됨
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
