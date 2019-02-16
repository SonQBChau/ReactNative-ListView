

import React, {PureComponent} from 'react';
import {StyleSheet, Text, SafeAreaView, Image, Dimensions} from 'react-native';
import toDate from 'date-fns/parse';
import toDateString from 'date-fns/format';
const window = Dimensions.get('window');

/*
    DETAIL VIEW SCREEN, SHOW IMAGE AND DETAIL INFO DESCRIPTION
*/
export default class DetailView extends PureComponent{

    //default state
    state = {
        key: '',
        name: '',
        img : '',
  
    }

    componentDidMount(){
        // get ID passing from ListView
        const { navigation } = this.props;
        const userId = navigation.getParam('userId', 'NO-ID');
        // console.log(userId);

        // fetch API user detail
        // this is where we call API with specific ID to fetch user detail
        // since randomuser.com doesn't support calling API with ID, for demo purpose, we just call a random person here
        return fetch('https://randomuser.me/api/?results=1') // passing props ID here
            .then((response) => response.json())
            .then((responseJson) => {
                // map data object if Json doesn't return in correct format
                const dataSource = responseJson.results.map((user)=> {
                    const first = user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1);
                    const last = user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1);
                    const date = toDate(user.dob.date);
                    const dob = toDateString(date,  'MM/DD/YYYY')
                    return (
                        {
                            key: user.email,
                            name: `${first} ${last}`,
                            img: user.picture.large,
                            location: `${user.location.street}, ${user.location.city} ${user.location.state}, ${user.location.postcode}`,
                            gender: user.gender,
                            dob: dob
                        }
                    )
                });

                // set data to state
                this.setState(()=>({
                    key: dataSource[0].key,
                    name: dataSource[0].name,
                    img: dataSource[0].img,
                    location: dataSource[0].location,
                    gender: dataSource[0].gender,
                    dob: dataSource[0].dob,
                }));

      })
      .catch((error) =>{
        console.error(error);
      });
    }


  render() {
    return (
    <SafeAreaView style={styles.container}>
        <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: this.state.img}}
        />
        <Text style={styles.text}>Name: {this.state.name}</Text>
        <Text style={styles.text}>Gender: {this.state.gender}</Text>
        <Text style={styles.text}>DOB: {this.state.dob}</Text>
        <Text style={styles.text}>Location: {this.state.location}</Text>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: '#F5FCFF'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    image: {
        width: window.width, 
        height: window.width,
    }

});
