import { View } from 'react-native';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../src/amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

export default function HomeScreen() {
  return (
    <View style={{backgroundColor:'#fff'}}>
      Hi
    </View>
  );
}
