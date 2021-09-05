import React, { Component } from 'react';
import Animated, { EasingNode } from 'react-native-reanimated';

import {
    View,
    Dimensions} from 'react-native';

const WIDTH= Dimensions.get('window').width;

export class TriangleUp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View style={{
                width: 0,
                    height: 0,
                    backgroundColor: "transparent",
                    borderStyle: "solid",
                    borderLeftWidth: 50,
                    borderRightWidth: 50,
                    borderBottomWidth: 100,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomColor: this.props.style.color,
                    ...this.props.style
            }} />
         );
    }
}

export class TriangleDown extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <TriangleUp style={{ 
                transform: [{ rotate: "180deg" }],
                ...this.props.style
            }} />
         );
    }
}

export class Parallelogram extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {color, transform, position, top, right, bottom, left, marginLeft} = this.props
        return ( 
        <View style={{
            width: 150,
            height: 100,
            transform,
            position,
            top,
            right,
            bottom,
            left,
            marginLeft
        }}>
            <TriangleUp style={{
                 top: 0,
                 right: -50,
                 position: "absolute",
                 borderBottomColor: color,
            }} />
            <View style={{
                 position: "absolute",
                 left: 0,
                 top: 0,
                 backgroundColor: color,
                 width: 150,
                 height: 100,
            }} />
            <TriangleDown style={{
                  top: 0,
                  left: -50,
                  position: "absolute",
                  borderBottomColor: color,
            }} />
        </View>
         );
    }
}

export class TriangleCorner extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <View style={{
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderRightWidth: WIDTH,
                borderTopWidth: 100,
                borderRightColor: 'transparent',
                // borderTopColor: color,
                ...this.props.style
            }} />
        );
    }
}
 

export class Trapezoid extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View style={{
                width: 200,
                height: 0,
                borderBottomWidth: 100,
                borderBottomColor: this.props.style.color,
                borderLeftWidth: 200,
                borderLeftColor: 'transparent',
                borderRightWidth: 200,
                borderRightColor: 'transparent',
                borderStyle: 'solid',
                ...this.props.style
            }} />
         );
    }
}

export class Rectangle extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <View style={[{
                width: 100 * 2,
                height: 100,
                backgroundColor: this.props.style.color
            }, this.props.style]} />
         );
    }
}
