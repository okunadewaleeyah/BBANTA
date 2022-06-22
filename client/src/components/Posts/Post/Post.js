import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import HowToRegOutlinedIcon from '@material-ui/icons/HowToRegOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, votePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
  };

  const Votes = () => {
    if (post.votes?.length > 0) {
      return post.votes.find((vote) => vote === (user?.result?.googleId || user?.result?._id))
        ? (
          <><HowToRegIcon fontSize="small" />&nbsp;{post.votes.length > 2 ? `You and ${post.votes.length - 1} others` : `${post.votes.length} vote${post.votes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><HowToRegOutlinedIcon fontSize="small" />&nbsp;{post.votes.length} {post.votes.length === 1 ? 'Vote' : 'Votes'}</>
        );
    }

    return <><HowToRegOutlinedIcon fontSize="small" />&nbsp;Vote</>;
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>

      <Button size="small" style={{ color: '#7a5c28' }} disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>

        <Button size="small" style={{ color: '#7a5c28' }} disabled={!user?.result} onClick={() => dispatch(votePost(post._id))}>
          <Votes />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
