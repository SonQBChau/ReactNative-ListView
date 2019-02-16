import React, {Component} from 'react';
import { StyleSheet, FlatList, SafeAreaView} from 'react-native';
import DemoImg from '../components/DemoImg';

/*
    LISTVIEW SCREEN, DISPLAY LIST OF IMAGE AND TITLE IN 2 COLUMNS FORMAT
*/
export default class App extends Component{

    // default state
    state = {
        dataSource :[
            {
                key: '',
                title: '',
                img : '',
            },
        ],
    }

    componentDidMount(){
        //calling API to fetch data
        return fetch('https://randomuser.me/api/?results=20')
            .then((response) => response.json())
            .then((responseJson) => {
        
            const dataSource = responseJson.results.map((user)=> {
                const first = user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1);
                const last = user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1);
                return ({key: user.email,
                        title: `${first} ${last}`,
                        img: user.picture.large}
                        )
            })
            //set state
            this.setState(()=>({
                dataSource
            }));

        })
        .catch((error) =>{
            console.error(error);
        });
    }


    handleClick = (id) =>{
        // handle onClick action, navigate to detail view with ID
        this.props.navigation.navigate('Detail', {userId: id});
    }

  render() {
    const imgList = this.state.dataSource;
    console.log(this.props.navigation);
    return (
    <SafeAreaView style={styles.container}>
            <FlatList
                columnWrapperStyle={styles.list}
                numColumns={2}
                horizontal={false}
                data={imgList}
                renderItem={({item}) => {
                    return (
                        <DemoImg
                            source={item.img}
                            title={item.title}
                            id={item.key}
                            onPress={this.handleClick}
                        />
                    )}}
            />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#F5FCFF'
  },
  list: {
    justifyContent: 'space-between',
  }
});
