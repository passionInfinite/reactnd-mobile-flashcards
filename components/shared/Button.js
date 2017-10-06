import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import COLORS from "../../utils/colors";

export default function Button({onPress, title, style, textColor}) {
  return (
    <View style={{width: 200, alignSelf: 'center'}}>
      <TouchableOpacity onPress={onPress} style={[styles.submitBtn,style]}>
        <Text style={[styles.submitBtnText, textColor]}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  submitBtn: {
    padding: 20,
    backgroundColor: COLORS.PURPLE,
    alignContent: 'center',
    borderRadius: 5
  },
  submitBtnText: {
    fontSize: 20,
    textAlign: 'center',
    color: COLORS.WHITE
  }
})