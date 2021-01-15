import React, { useState, useEffect } from 'react';
import { TextInput, Text, Button, FlatList, ActivityIndicator, View, StyleSheet  } from 'react-native'
import NewsItems from '../components/NewsItems'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as productActions from '../store/actions'
import { Feather } from '@expo/vector-icons'



const MainScreen = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState();
  const [text, setText] = useState(text)
  const news = useSelector(state => state.news.news);

  const ChangeHandler = (text1) => {
    setText(text1);
  }

  const infinteScroll = () => {
    //End of the document reached ?
    dispatch(productActions.newData(false));
    dispatch(productActions.addNews());
    dispatch(productActions.fetchProducts(text))
  }

  const loadProducts = async () => {
    dispatch(productActions.newData(true))
    setError(null)
    setIsRefreshing(true)
    setIsLoading(true)
    await dispatch(productActions.fetchProducts(text));
    setIsRefreshing(false)
    setIsLoading(false)

  };

  useEffect(() => {
    
    props.onInitUsers()
  }, []);

  const selectHandler = (_id, lead_paragraph, image_url) => {
    props.navigation.navigate('Modal', {
      NewsId: _id,
      Image: image_url,
      title: lead_paragraph
    });

  }

  if (text === '' || text == text) {
    return  <View>
      <TextInput placeholder='Search News'
        placeholderTextColor='#666'
        style={styles.SearchBox}
        onChangeText={ChangeHandler}
        value={text}
        
      />
      <Feather onPress={loadProducts} name='search' size={22} color='#666' style={styles.searchBoxIcon} />
      <FlatList onEndReached={infinteScroll}
        onEndReachedThreshold={0.1}
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={news}
        keyExtractor={item => item._id}
        renderItem={itemData => <NewsItems
          onSelect={() => { selectHandler(itemData.item._id, itemData.item.abstract, itemData.item.image_url) }}
          image={itemData.item.image_url}
          title={itemData.item.abstract} />
        }
      />
    </View >
 
  }


  if (error) {
    return <View style={styles.centered}>
      <Text>An error occured</Text>
      <Button title="Try again" onPress={loadProducts} color='black' />
    </View>
  }

  if (isLoading) {
    return <View style={styles.spinner}>
      <ActivityIndicator size='large' color='green' />
    </View>
  }

  return (<View style={styles.centered}>
    <View style={styles.searchBoxContainer}>
     

    </View>
   
  </View>
  )


}

const styles = StyleSheet.create({
  spinner:{
    flex:1,
 zIndex:2,
 justifyContent :'center'
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
    padding: 12,
    paddingLeft: 20,
    fontSize: 16
  },
  searchBoxIcon: {
    position: 'absolute',
    right: 20,
    top: 14

  }
})

const mapStatetoProps = state => {
  return {
    news: state.news.news

  }
}

const mapDispatchtoProps = dispatch => {
  return {
    onInitUsers: () => dispatch(productActions.fetchProducts()),
    onScrolling: () => dispatch(productActions.newData())
  }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(MainScreen)
