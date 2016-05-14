import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PageControl from './PageControl';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
  },
  pageControl: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
  },
});

export default class PageControlDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
    };

    this.onScroll = this.onScroll.bind(this);
  }

  onScroll(event) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const pageWidth = Dimensions.get('window').width - 10;

    this.setState({
      currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1,
    });
  }

  onItemTap(index) {
    console.log(index); // eslint-disable-line no-console
  }

  render() {
    const width = Dimensions.get('window').width;
    const pages = new Array(3).fill().map((page, index) => (
      <View key={`page_${index}`} style={[styles.page, { width }]}>
        <Text style={styles.title}>Page {index + 1}</Text>
      </View>
    ));

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
        >
          {pages}
        </ScrollView>
        <PageControl
          style={styles.pageControl}
          numberOfPages={pages.length}
          currentPage={this.state.currentPage}
          currentPageIndicatorTintColor="black"
          onPageIndicatorPress={this.onItemTap}
        />
      </View>
    );
  }
}
