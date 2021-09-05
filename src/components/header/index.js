import React, { Component } from 'react';
import {connect} from "react-redux";
import {signOut} from '../../reducers/actions/auth';
import { COLOR } from '../../constant/color';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  Dimensions
  } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal";

const WIDTH= Dimensions.get('window').width;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalVisible: false
         }
    }

    clickModalHandler = (visible, command) => {
      this.setState({ modalVisible: visible });
      if (command==='signOut') {
        this.props.doLogout()
      }else if(command==='toProfile'){
        this.props.navigation.navigate('ProfileView')
      }
      
    }

    renderLogout = () => {
      const { modalVisible } = this.state;

      return (
      <View>
         <Modal
            isVisible={modalVisible}
            animationIn="slideInDown"
            animationOut='slideOutRight'
            backdropOpacity={0}
            onBackdropPress={() => this.clickModalHandler(!modalVisible)}
          >
          <View
          style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
               underlayColor={COLOR.gray}
                style={styles.button}
                onPress={() => this.clickModalHandler(!modalVisible,'toProfile')}
              >
                <Text style={styles.textStyle}>Profile</Text>              
              </TouchableHighlight>
              <TouchableHighlight
               underlayColor={COLOR.gray}
                style={styles.button}
                onPress={() => this.clickModalHandler(!modalVisible,'signOut')}
              >
                <Text style={styles.textStyle}>Sign Out</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      )
    }

    render() { 
        return (
            <View style={styles.top}>
            <StatusBar translucent={false} backgroundColor='#0A4740' />
            <Text style={styles.logo}>WhatsApp</Text>
            <View style={styles.icons}>
              <TouchableOpacity>
                <Icon
                  name="search"
                  color="#fff"
                  size={23}
                  style={{ padding: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="chat"
                  color="#fff"
                  size={23}
                  style={{ padding: 5 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => this.clickModalHandler(true)}
              >
                <Icon
                  name="more-vert"
                  color="#fff"
                  size={23}
                  style={{ padding: 5 }}
                />
              </TouchableOpacity>
              {this.renderLogout()}
            </View>
          </View>
          );
    }
}
 
const mapDispatchToProps = dispatch => ({
    doLogout: () => dispatch(signOut())
})

export default connect(null, mapDispatchToProps)(Header);


const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    backgroundColor: '#075e54',
    borderColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  logo: {
    fontSize: 23,
    color: '#fff',
    margin: 10,
    fontWeight: '500',
  },
  icons: {
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    margin:-20
  },
  modalView: {
    marginLeft:WIDTH*0.5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    padding: 10,
    elevation: 2,
    alignItems:'flex-start',
    justifyContent:'flex-start',
  },
  textStyle: {
    fontSize:17,
  },
  modalText: {
    marginBottom: 15,

  }
});