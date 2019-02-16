

import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

export default class DemoImg extends Component{

    // navigate to detail page
    _onPressButton = () =>{
        this.props.onPress(this.props.id);
    }

  render() {

    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={this._onPressButton}>
                <Image
                    style={styles.img}
                    source={{uri: this.props.source}}
                />
                <Text style={styles.text}>{this.props.title}</Text>
            </TouchableOpacity>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight:10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  img: {
    width: 160, 
    height: 160
  }

});
