import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, FlatList, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';

import { getPopularMovies, searchMovies } from './actions';
import { Text, View } from '../../components/Themed';
import {IMAGE_API_BASE} from './api'

const SearchScreen = React.memo((props) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);

  // redux state
  const Selector = {
    movies: useSelector((state) => state.search.movies)
  };

  // dispatch actions
  const Action = {
    getPopularMovies: () => dispatch(getPopularMovies()),
    searchMovies: (value) => dispatch(searchMovies(value)),
  };

  useEffect(() => {
    Action.getPopularMovies();
  }, []);

  const movies = Selector.movies || [];

  const renderItem = ({ item }) => (
      <View style={styles.movie}>
        <TouchableOpacity onPress={() => {props.navigation.navigate('Details', {...item})}}>
          <Image source={{uri: IMAGE_API_BASE+item.poster_path}} style={styles.movieImage} />
        </TouchableOpacity>
      </View>
  );

  const WhatsPopular = () => {
    return (
      <Text style={styles.whatsPopular}>What's popular</Text>
    )
  }

  const handleInputValueChange = (e) => {
    setInputValue(e.nativeEvent.text)
  }

  useEffect(() => {
    if(inputValue && inputValue.length > 2) {
      Action.searchMovies(inputValue);
    } else {
      Action.getPopularMovies();
    }
  }, [inputValue])

  const onInputFocus = () => {
    setInputFocused(true);
  }

  const clearInput = () => {
    setInputFocused(false);
    setInputValue('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputWrap}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search"
          value={inputValue}
          placeholderStyle={styles.searchPlaceholder}
          onChange={handleInputValueChange}
          onFocus={onInputFocus}
          onBlur={() => {setInputFocused(false)}}
        />
        {
          inputFocused ? 
          <TouchableOpacity style={styles.cancelTouch} onPress={clearInput}>
            <Text>Cancel</Text>
          </TouchableOpacity> 
          :
          null
        }
      </View>
      <FlatList
        data={movies}
        ListHeaderComponent={WhatsPopular}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        horizontal={false}
        style={styles.movieList}
      />
    </View>
  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  whatsPopular: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  movieList: {
  },
  movie: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 30
  },
  movieImage: {
    width: 105,
    height: 154,
    borderRadius: 10
  },
  inputWrap: {
    flexDirection: 'row'
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EAEAEB',
    backgroundColor: '#EAEAEB',
    padding: 10,
    margin: 10,
    fontSize: 16
  },
  searchPlaceholder: {
    color: '#0B253F',
    fontSize: 16
  },
  cancelTouch: {
    justifyContent: 'center',
    margin: 10,
    fontSize: 16
  }
});

export default SearchScreen;
