import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default class PageControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      indicatorStyle: {},
      currentIndicatorStyle: {},
    };

    this.updateIndicatorStyles = this.updateIndicatorStyles.bind(this);
    this.onPageIndicatorPress = this.onPageIndicatorPress.bind(this);
  }

  componentWillMount() {
    this.updateIndicatorStyles(this.props);
  }

  componentWillReceiveProps(newProps) {
    const propsToCheck = [
      'indicatorSize',
      'indicatorStyle',
      'pageIndicatorTintColor',
      'currentIndicatorStyle',
      'currentPageIndicatorTintColor',
    ];
    let needsUpdate = false;

    propsToCheck.forEach((prop) => {
      needsUpdate = newProps[prop] !== this.props[prop];
    });

    if (needsUpdate) {
      this.updateIndicatorStyles(newProps);
    }
  }

  onPageIndicatorPress(idx) {
    this.props.onPageIndicatorPress(idx);
  }

  updateIndicatorStyles(props) {
    const indicatorBaseStyle = {
      width: props.indicatorSize.width,
      height: props.indicatorSize.height,
      borderRadius: props.indicatorSize.height / 2,
      marginLeft: 5,
      marginRight: 5,
    };
    const indicatorStyle = [
      indicatorBaseStyle,
      props.indicatorStyle,
      { backgroundColor: props.pageIndicatorTintColor },
    ];
    const currentIndicatorStyle = [
      indicatorBaseStyle,
      props.currentIndicatorStyle,
      { backgroundColor: props.currentPageIndicatorTintColor },
    ];

    this.setState({
      indicatorStyle,
      currentIndicatorStyle,
    });
  }

  render() {
    const { currentPage, numberOfPages, hidesForSinglePage } = this.props;

    if (numberOfPages <= 1 && hidesForSinglePage) {
      return null;
    }

    const indicators = [];
    const { indicatorStyle, currentIndicatorStyle } = this.state;

    for (let i = 0; i < numberOfPages; i++) {
      indicators.push(
        <TouchableWithoutFeedback
          key={i}
          onPress={() => this.onPageIndicatorPress(i)}
        >
          <View style={i === currentPage ? currentIndicatorStyle : indicatorStyle} />
        </TouchableWithoutFeedback>
      );
    }

    return (
      <View
        style={[
          styles.container,
          { height: this.props.indicatorSize.height },
          this.props.style,
        ]}
      >
        {indicators}
      </View>
    );
  }
}

PageControl.propTypes = {
  style: View.propTypes.style,
  numberOfPages: React.PropTypes.number.isRequired,
  currentPage: React.PropTypes.number,
  hidesForSinglePage: React.PropTypes.bool,
  pageIndicatorTintColor: React.PropTypes.string,
  currentPageIndicatorTintColor: React.PropTypes.string,
  indicatorSize: React.PropTypes.object,
  indicatorStyle: View.propTypes.style,
  currentIndicatorStyle: View.propTypes.style,
  onPageIndicatorPress: React.PropTypes.func,
};

PageControl.defaultProps = {
  numberOfPages: 0,
  currentPage: 0,
  hidesForSinglePage: false,
  pageIndicatorTintColor: 'gray',
  currentPageIndicatorTintColor: 'white',
  indicatorSize: {
    width: 8,
    height: 8,
  },
};
