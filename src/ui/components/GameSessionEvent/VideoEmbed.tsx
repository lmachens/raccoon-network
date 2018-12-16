import React from 'react';

const VideoEmbed = ({ video }) => {
  return <span dangerouslySetInnerHTML={{ __html: video.iframe }} />;
};

export default VideoEmbed;
