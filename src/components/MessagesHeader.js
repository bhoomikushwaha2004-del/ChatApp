import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';

const MessagesHeader = () => {
    const navigation = useNavigation()
    const route = useRoute()
  const {userName} = route.params;
  return (
    <> 
    <StatusBar barStyle={'dark-content'} />
    <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}>

          <Ionicons
            name="arrow-back"
            size={SIZES.extraExtraExtraMedium} //28
            color={COLORS.primary} //000
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {userName}
        </Text>

        <View style={{width: 28}} />

      </View>

      </>
  )
}

export default MessagesHeader

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: SIZES.smallest, //15
    paddingVertical: SIZES.smallest, //15

    borderBottomWidth: SIZES.xtraXtraXtraS, //1
    borderColor: COLORS.secondWhite, //eee

    paddingTop: SIZES.m, //50
  },

  headerTitle: {
    fontSize: FONT_SIZE.xm, //20
    fontWeight: '700',
    color: COLORS.primary, //000
    alignSelf:'center'
  },
})