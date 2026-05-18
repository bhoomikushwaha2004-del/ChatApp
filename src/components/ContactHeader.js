import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ContactHeader = ({contacts}) => {
    const navigation = useNavigation()
  return (
    <View style={styles.header}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>

          <Ionicons
            name="arrow-back"
            size={24}
            color="#000"
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

    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  backBtn: {
    width: 45,
    height: 45,
    borderRadius: 22,

    backgroundColor: '#fff',

    justifyContent: 'center',
    alignItems: 'center',

    marginRight: 14,

    elevation: 3,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
  },

  headerSubTitle: {
    color: 'gray',
    marginTop: 2,
  },
})