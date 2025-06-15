import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const Button = ({
  txt,
  radius = 12,
  color = 'white',
  bg = '#007bff',
  paddingHorizontal = 0,
  paddingVertical = 15,
  fontSize = 18,
  fontWeight = 'bold',
  press,
  disabled = false,
  width = "100%"
}) => {
  const buttonStyle = StyleSheet.create({
    button: {
      width: width,
      backgroundColor: bg,
      borderRadius: radius,
      paddingHorizontal,
      paddingVertical,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: color,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontFamily: "Raleway_500Medium"
    },
    disabled: {
      opacity: 0.5, // Visually indicate disabled state
    },
  });

  return (
    <Pressable
      onPress={()=>press()}
      style={[
        buttonStyle.button,
        disabled && buttonStyle.disabled, // Apply disabled style conditionally
      ]}
      disabled={disabled} // Enable disabled prop
    >
      <Text style={buttonStyle.text}>{txt}</Text>
    </Pressable>
  );
};

export default Button;