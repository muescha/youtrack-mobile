import styles from './comment.styles';
import relativeDate from 'relative-date';
import Wiki, {decorateRawText} from '../../components/wiki/wiki';
import {COLOR_LIGHT_GRAY, COLOR_FONT_GRAY, COLOR_LINK, COLOR_PINK} from '../../components/variables/variables';

import {View, Text, Image} from 'react-native';
import React from 'react';
import Swipeout from 'react-native-swipeout';
import SwipeButton from './comment__swipe-button';
import {comment, next} from '../icon/icon';

export default class Comment extends React.Component {
  static defaultProps = {
    onReply: () => {
    },
    onCopyCommentLink: () => {
    }
  }

  _getCommentActionButtons() {
    const swipeoutBtns = [
      {
        backgroundColor: COLOR_PINK,
        component: <SwipeButton text="Reply" icon={comment}/>,
        onPress: this.props.onReply.bind(this)
      }, {
        backgroundColor: '#000',
        component: <SwipeButton text="Copy link" icon={next}/>,
        onPress: this.props.onCopyCommentLink.bind(this)
      }
    ]
    return swipeoutBtns;
  }

  _renderComment(comment, attachments) {
    return <Wiki onIssueIdTap={issueId => this.props.onIssueIdTap && this.props.onIssueIdTap(issueId)}>
      {decorateRawText(comment.text, comment.textPreview, attachments)}
    </Wiki>;
  }

  render() {
    const {comment, attachments} = this.props;

    return (
      <Swipeout
        key={comment.id}
        backgroundColor={COLOR_LIGHT_GRAY}
        right={this._getCommentActionButtons()}
        autoClose={true}>
        <View style={styles.commentWrapper}>
          <Image style={styles.avatar} source={{uri: comment.author.avatarUrl}}/>
          <View style={styles.comment}>
            <Text>
              <Text style={{color: COLOR_LINK}}>{comment.author.fullName || comment.author.login}</Text>
              <Text style={{color: COLOR_FONT_GRAY}}> {relativeDate(comment.created)}</Text>
            </Text>
            <View style={styles.commentText}>{this._renderComment(comment, attachments)}</View>
          </View>
        </View>
      </Swipeout>
    )
  }
}