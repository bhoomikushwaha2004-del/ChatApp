import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { SIZES,FONT_SIZE,COLORS,BORDER_RADIUS,ELEVATION } from '../styles';

const ContactHeader = ({contacts}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>

          <Ionicons
            name="arrow-back"
            size={SIZES.xxxs} //24
            color={COLORS.primary} //000
          />

        </TouchableOpacity>

        <View>

          <Text style={styles.headerTitle}>
            Select Contact
          </Text>

          <Text style={styles.headerSubTitle}>
            {contacts.length} contacts
          </Text>

        </View>

      </View>
  )
}

export default ContactHeader

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: SIZES.xs, //18
    paddingVertical: SIZES.s, //16
  },

  backBtn: {
    width: SIZES.mediumest, //45
    height: SIZES.mediumest, //45
    borderRadius: BORDER_RADIUS.xxm, //22

    backgroundColor: COLORS.secondary, //fff

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: SIZES.smaller, //14

    elevation: ELEVATION.medium, //3
  },

  headerTitle: {
    fontSize: FONT_SIZE.l, //22
    fontWeight: '700',
    color: COLORS.primary, //000
  },

  headerSubTitle: {
    color: 'gray',
    marginTop: SIZES.xtraXtraS, //2
  },
})