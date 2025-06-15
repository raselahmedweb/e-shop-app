import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { type StyleProp, type TextStyle } from 'react-native';

// see Material Icons in the [Icons Directory](https://icons.expo.fyi).

export function Icon({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string;
  style?: StyleProp<TextStyle>;
}) {
  return <MaterialIcons color={color} size={size} name={name} style={style} />;
}
