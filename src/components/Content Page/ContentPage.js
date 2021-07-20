import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./ContentPage.css";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ContentPage.css";
import fetchFeeds from "../../redux/Feed/feedActions";
import { loadUser } from "../../redux/Auth/authActions";

function ContentPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.feed.loading);
  const feedData = useSelector((state) => state.feed.user);

  console.log(feedData);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(fetchFeeds(""));
  }, []);

  function getTime(postTime) {
    const date = new Date(postTime);
    return date.toLocaleString("en-US");
  }

  return (
    <div className="content">
      {isLoading ? (
        <div className="loading-spinner" color="secondary">
          <CircularProgress />
        </div>
      ) : (
        feedData?.map((item) => (
          <Card key={item._id} className="card">
            <CardHeader
              avatar={<Avatar></Avatar>}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.name}
              subheader={getTime(item.date)}
            />
            <CardMedia
              component="img"
              className="card-media"
              image={`/uploads/${item.img.slice(8)}`}
            />
            <CardContent>
              <Typography variant="body1" color="textPrimary" component="h6">
                {item.placeName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default ContentPage;
