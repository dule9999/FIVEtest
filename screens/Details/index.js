import * as React from 'react';
import { StyleSheet, ImageBackground, Dimensions } from 'react-native';

import { Text, View } from '../../components/Themed';
import { IMAGE_API_BASE } from '../Search/api';

const DetailsScreen = React.memo((props) => {
  const movie = props?.route?.params
  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: IMAGE_API_BASE+movie.poster_path}} style={styles.imgBcg} resizeMode="cover">
        <View style={styles.textInImgBcg}>
          <Text style={styles.title}>{movie.original_title}</Text>
          <Text style={styles.info}>{movie.release_date}</Text>
        </View>
      </ImageBackground>
      <View style={styles.overviewWrap}>
        <Text style={styles.overview}>Overview</Text>
        <Text style={styles.overviewText}>{movie.overview}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBcg: {
    width: Dimensions.get('window').width,
    height: 300,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  textInImgBcg: {
    backgroundColor: 'transparent',
    margin: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2F2F2'
  },
  info: {
    fontSize: 14,
    color: '#F2F2F2'
  },
  overviewWrap: {
    margin: 20
  },
  overview: {
    fontSize: 20,
  },
  overviewText: {
    fontSize: 14
  }
});

export default DetailsScreen;