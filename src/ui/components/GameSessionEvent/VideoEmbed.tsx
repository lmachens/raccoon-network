import React from 'react';

const VideoEmbed = ({ video }) => {
  return <div dangerouslySetInnerHTML={{ __html: video.iframe }} />;
};

export default VideoEmbed;
