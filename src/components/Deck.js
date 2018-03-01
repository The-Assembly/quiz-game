import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, Button } from 'react-native-elements'

// Screen width to create a swipe threshold
// After the user  swipes beyond the swipe threshold, we trigger a function
const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {

// This is convention
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }

  constructor(props) {
    super(props);
      // Pan responder handels events like
      // on touch, so in our case we dynamically change the x and y position
      // on relase , we check the position of card and if it's above the swipe threshold
      const position = new Animated.ValueXY();
      const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
          position.setValue({x: gesture.dx , y: gesture.dy})
        },
        onPanResponderRelease: (event, gesture) => {
          if( gesture.dx > SWIPE_THRESHOLD) {
            this.forceSwipe('right');
          } else if( gesture.dx < -SWIPE_THRESHOLD) {
            this.forceSwipe('left');
          } else {
          this.resetPosition();
          }
        }
      });

      this.state = { panResponder, position, index: 0, mute: false };
      // State is the dynamic engine of react native , position is what changes
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.data !== this.props.data){
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    //Remove this line if your animation is actiong wierd on android
    //What this does create a nice spring when you finsih swipping the card
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    LayoutAnimation.spring();
  }

  answer(check) {
    // If it's right  or wrong it'll trigger function mention on the play.js screen , check the properties of the deck tag in ply.js
    const x = check === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x , y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.answerRespond(check));
    }

  answerRespond(check) {
    // Same thing , but by chaning index we call the next card
    const { correctAnswer, wrongAnswer, data } = this.props;
    const item = data[this.state.index]
    check === 'right' ? correctAnswer() : wrongAnswer();
    this.state.position.setValue({ x: 0, y:0 });
    this.setState({ index: this.state.index + 1 });
    }

  optionButton(item) {
    //Using item in previous screen we get different buttion option orders
    switch(item.order) {
      case 0 :{
        return (
          <View>
          <Button
           title={item.A1}
           large
           onPress={() => this.answer('right')}
           textStyle={{ fontWeight: "700" }}
           buttonStyle={{
             backgroundColor: "#03A9F4",
             width: 300,
             height: 45,
             borderColor: "transparent",
             borderWidth: 0,
             borderRadius: 5,
           }}
          />
          <View style={styles.padding} />
          <Button
           title={item.P2}
           large
           onPress={()=>this.answer('wrong')}
           textStyle={{ fontWeight: "700" }}
           buttonStyle={{
             backgroundColor: "#03A9F4",
             width: 300,
             height: 45,
             borderColor: "transparent",
             borderWidth: 0,
             borderRadius: 5,
           }}
          />
          <View style={styles.padding} />
          <Button
           title={item.P3}
           large
           onPress={()=>this.answer('wrong')}
           textStyle={{ fontWeight: "700" }}
           buttonStyle={{
           backgroundColor: "#03A9F4",
           width: 300,
           height: 45,
           borderColor: "transparent",
           borderWidth: 0,
           borderRadius: 5,
           }}
           />
           </View>
        );
      }
      case 1: {
        return(
          <View>
          <Button
           title={item.P3}
           large
           onPress={()=>this.answer('wrong')}
           textStyle={{ fontWeight: "700" }}
           buttonStyle={{
           backgroundColor: "#03A9F4",
           width: 300,
           height: 45,
           borderColor: "transparent",
           borderWidth: 0,
           borderRadius: 5,
           }}
           />
           <View style={styles.padding} />
           <Button
            title={item.P2}
            large
            onPress={()=>this.answer('wrong')}
            textStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#03A9F4",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
            }}
           />
           <View style={styles.padding} />
           <Button
            title={item.A1}
            large
            onPress={() => this.answer('right')}
            textStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "#03A9F4",
              width: 300,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
            }}
           />
           </View>
        );
      }
      case 2:{
        return(
          <View>
          <Button
           title={item.A1}
           large
           onPress={() => this.answer('right')}
           textStyle={{ fontWeight: "700" }}
           buttonStyle={{
             backgroundColor: "#03A9F4",
             width: 300,
             height: 45,
             borderColor: "transparent",
             borderWidth: 0,
             borderRadius: 5,
           }}
          />
         <View style={styles.padding} />
         <Button
          title={item.P3}
          large
          onPress={()=>this.answer('wrong')}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#03A9F4",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
          }}
         />
         <View style={styles.padding} />
         <Button
          title={item.P2}
          large
          onPress={()=>this.answer('wrong')}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={{
          backgroundColor: "#03A9F4",
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
          }}
          />
          </View>
        );
      }
      case 3:{
        return(
          <View>
          <Button
           title={item.P3}
           large
           onPress={() => this.answer('wrong')}
           textStyle={{ fontWeight: "700" }}
           buttonStyle={{
             backgroundColor: "#03A9F4",
             width: 300,
             height: 45,
             borderColor: "transparent",
             borderWidth: 0,
             borderRadius: 5,
           }}
          />
         <View style={styles.padding} />
         <Button
          title={item.A1}
          large
          onPress={()=>this.answer('right')}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#03A9F4",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
          }}
         />
         <View style={styles.padding} />
         <Button
          title={item.P2}
          large
          onPress={()=>this.answer('wrong')}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={{
          backgroundColor: "#03A9F4",
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
          }}
          />
          </View>
        );
      }
      case 4:{
        return(
          <View>
          <Button
           title={item.P2}
           large
           onPress={() => this.answer('wrong')}
           textStyle={{ fontWeight: "700" }}
           buttonStyle={{
             backgroundColor: "#03A9F4",
             width: 300,
             height: 45,
             borderColor: "transparent",
             borderWidth: 0,
             borderRadius: 5,
           }}
          />
         <View style={styles.padding} />
         <Button
          title={item.A1}
          large
          onPress={()=>this.answer('right')}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#03A9F4",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
          }}
         />
         <View style={styles.padding} />
         <Button
          title={item.P3}
          large
          onPress={()=>this.answer('wrong')}
          textStyle={{ fontWeight: "700" }}
          buttonStyle={{
          backgroundColor: "#03A9F4",
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
          }}
          />
          </View>
        );
      }
      default:{
        return(
        <View>
        <Button
         title={item.P2}
         large
         onPress={() => this.answer('wrong')}
         textStyle={{ fontWeight: "700" }}
         buttonStyle={{
           backgroundColor: "#03A9F4",
           width: 300,
           height: 45,
           borderColor: "transparent",
           borderWidth: 0,
           borderRadius: 5,
         }}
        />
       <View style={styles.padding} />
       <Button
        title={item.P3}
        large
        onPress={()=>this.answer('wrong')}
        textStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "#03A9F4",
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
        }}
       />
       <View style={styles.padding} />
       <Button
        title={item.A1}
        large
        onPress={()=>this.answer('right')}
        textStyle={{ fontWeight: "700" }}
        buttonStyle={{
        backgroundColor: "#03A9F4",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 5,
        }}
        />
        </View>
        );
      }
    }
  }

  renderCard(item) {
    //We use the react native element card component and call our own mixed order option button
      return (
        <Card
          key={item.id}
          title={item.text}
        >
          {this.optionButton(item)}
        </Card>
      );

  }

  renderNoMoreCard() {
    // We call this when there are no more cards to render
    return (
      <Card title="All Done!">
        <Button
        title="You broke the game"
        large
        textStyle={{ fontWeight: "700" }}
        buttonStyle={{
          backgroundColor: "#03A9F4",
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 5,
        }}
        />
      </Card>
    );
  }

  forceSwipe(direction) {
    // WHen swipe is done it triggers a function on play.js , just like answer function
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x , y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    // Same as answer check function , read above
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index]
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y:0 });
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    // Renders new card to intial positon
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    // This makes sure the card rotates as user moves the card
    // interpolate works the same as any other language
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      // ... in react means addition instead of updating component to move card and transfrom is in charge of angle
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    //To check if there are no more cards
    if (this.state.index >= this.props.data.length) {
      return this.renderNoMoreCard();
    }

    return this.props.data.map((item, i) => {
      // To not return the card once swiped
      if (i < this.state.index) { return null; }
      // To render card if it mathces the index
      if(i === this.state.index) {
          return(
            <Animated.View
              key={item.id}
              style={[this.getCardStyle(), styles.cardStyle]}
              {...this.state.panResponder.panHandlers}
            >
              {this.renderCard(item)}
            </Animated.View>
          )
      }

      return (
        <Animated.View
          key={item.id}
          style={[styles.cardStyle, { top: 10 * (i - this.state.index)}]}
        >
          {this.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    //Final render
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  cardStyle: {
      position: 'absolute',
      width: SCREEN_WIDTH,
      elevation: 4
  },
  padding: {
    paddingTop: 20,
    paddingBottom: 20
  }
};

export default Deck;
