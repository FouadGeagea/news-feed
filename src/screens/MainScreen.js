/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { TextInput, Text, Button, FlatList, ActivityIndicator, View, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';
import NewsItems from '../components/NewsItems';
import { useDispatch, useSelector } from 'react-redux';
import * as productActions from '../store/actions';
import SearchBar from '../images/search.png';

const MainScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [text, setText] = useState('elections');
  const news = useSelector(state => state.news.news);

  const ChangeHandler = (text1) => {
    setText(text1);
  };

  const infinteScroll = async () => {
    //End of the document reached ?
    dispatch(productActions.newData(false));
    await dispatch(productActions.addNews());
    await dispatch(productActions.fetchProducts(text));
  };

  const loadProducts = async () => {
    await dispatch(productActions.newData(true));
    setError(null);
    setIsRefreshing(true);
    setIsLoading(true);
    await dispatch(productActions.fetchProducts(text));
    setIsRefreshing(false);
    setIsLoading(false);

  };

  useEffect(() => {
    dispatch(productActions.fetchProducts(text));
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectHandler = (_id, lead_paragraph, image_url) => {
    props.navigation.navigate('Modal', {
      NewsId: _id,
      Image: image_url,
      title: lead_paragraph
    });
  };

  if (error) {
    return <View style={styles.centered}>
      <Text>An error occured</Text>
      <Button title="Try again" onPress={loadProducts} color="black" />
    </View>;
  }

  if (isLoading) {
    return <View style={styles.spinner}>
      <ActivityIndicator size="large" color="green" />
    </View>;
  }

  if (text === '' || text !== '') {
    return <View>
      <TextInput placeholder="Search News"
        placeholderTextColor="#666"
        style={styles.SearchBox}
        onChangeText={ChangeHandler}
        value={text}
      />
      <TouchableNativeFeedback onPress={loadProducts}>
        <Image style={styles.searchBoxIcon} source={SearchBar} />
      </TouchableNativeFeedback>
      <FlatList onEndReached={infinteScroll}
        onEndReachedThreshold={0.3}
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={news}
        keyExtractor={item => item._id}
        renderItem={itemData => <NewsItems
          onSelect={() => { selectHandler(itemData.item._id, itemData.item.abstract, itemData.item.image_url); }}
          image={itemData.item.image_url}
          title={itemData.item.abstract} />
        }
      />
    </View>;
  }
};

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    zIndex: 2,
    justifyContent: 'center'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop: 30,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  searchBoxContainer: {
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 4,
    marginVertical: 10,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center'
  },
  SearchBox: {
    padding: 10,
    paddingLeft: 20,
    fontSize: 16,
  },
  searchBoxIcon: {
    position: 'relative',
    left: 280,
    bottom: 30,
    width: 14,
    height: 14
  }
});

export default MainScreen;
