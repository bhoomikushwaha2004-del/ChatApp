import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

const OnBoardingScreens = () => {
  const navigation = useNavigation();

  const Done = ({ ...props }) => ( 
    <TouchableOpacity  style={{ marginHorizontal: 10 }} {...props}>
      <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
  );

  const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? 'rgba(0,0,0,0.8)':'rgba(0,0,0,0.3)';

    return(
        <View
        style={{
            width:5, height:5, borderRadius:5,
            marginHorizontal:3, backgroundColor
        }}
        />
    )
  }
  console.log('onboard');
  


  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <Onboarding
        onSkip={() => navigation.replace('login')}
        onDone={() => navigation.replace('login')}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        pages={[
          {
            backgroundColor: '#a6e4d0',
            image: <Image source={require('../assets/onboarding-img1.png')} />,
            title: 'Connect to the World',
            subtitle: 'A New Way to Connect to the World',
          },
          {
            backgroundColor: '#fdeb93',
            image: <Image source={require('../assets/onboarding-img2.png')} />,
            title: 'Share your Favorites',
            subtitle: 'Share Your Thoughts with Similar Kind of People',
          },
          {
            backgroundColor: '#a9bcbe',
            image: <Image source={require('../assets/onboarding-img3.png')} />,
            title: 'Become the Star',
            subtitle: 'Let the Spot Light Capture You',
          },
        ]}
      />
    </>
  );
};

export default OnBoardingScreens;

const styles = StyleSheet.create({});
