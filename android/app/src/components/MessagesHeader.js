import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

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
            size={28}
            color="#000"
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

    paddingHorizontal: 15,
    paddingVertical: 15,

    borderBottomWidth: 1,
    borderColor: '#eee',

    paddingTop: 50,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
})