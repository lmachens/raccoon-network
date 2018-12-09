// https://docs.api.video/5.1/vod-tutorial/step-2-create-a-video-resource
const apiKey = 'OxrCq1NX7mx3ap8rWWa9U2vmPYeToPZQllroDzlK06g';

interface IAuth {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

let auth: IAuth;
const authenticate = async () => {
  if (auth) {
    return auth;
  }
  auth = await fetch('https://ws.api.video/auth/api-key', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      apiKey
    })
  }).then(response => response.json());
  return auth;
};

interface IVideoResourceInput {
  title: string;
  description: string;
}

interface IVideoResource {
  videoId: string;
  title: string;
  description: string;
  public: boolean;
  publishedAt: string;
  tags: any[];
  metadata: any[];
  source: {
    uri: string;
  };
  assets: {
    hls: string;
  };
}

const createVideoResource = async (videoResourceInput: IVideoResourceInput) => {
  console.log('createVideoResource', videoResourceInput);
  const videoResource: IVideoResource = await fetch('https://ws.api.video/videos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.access_token}`
    },
    body: JSON.stringify({
      ...videoResourceInput
    })
  }).then(response => response.json());
  return videoResource;
};

interface IVideo {
  videoId: string;
  title: string;
  description: string;
  public: boolean;
  publishedAt: string;
  tags: any[];
  metadata: any[];
  source: {
    uri: string;
  };
  assets: {
    hls: string;
  };
}

export const uploadVideo = async (replayUrl: string, title, description) => {
  await authenticate();
  const videoResource = await createVideoResource({
    title,
    description
  });

  const blob = await loadVideo(replayUrl);

  console.log('uploadVideo', replayUrl, videoResource);
  const data = new FormData();
  data.append('file', blob);

  const video: IVideo = await fetch(`https://ws.api.video/videos/${videoResource.videoId}/source`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.access_token}`
    },
    body: data
  }).then(response => response.json());

  return video;
};

const loadVideo = replayUrl => {
  return new Promise<Blob>((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(null);
        }
      }
    };
    xhr.open('GET', replayUrl, true);
    xhr.responseType = 'blob';

    xhr.send();
  });
};

export const createTitle = events => {
  const kills = events.filter(
    data => data.events.filter(subEvent => subEvent.name === 'kill').length
  ).length;
  const deaths = events.filter(
    data => data.events.filter(subEvent => subEvent.name === 'death').length
  ).length;
  const assists = events.filter(
    data => data.events.filter(subEvent => subEvent.name === 'assist').length
  ).length;

  let title = '';
  if (kills) {
    title += `${kills} kills`;
  }
  if (assists) {
    if (kills) {
      title += `, ${assists} assists`;
    } else {
      title += `${assists} assists`;
    }
  }
  if (deaths) {
    if (kills || assists) {
      title += ' and died';
    } else {
      title += 'Died';
    }
  }
  return title;
};
