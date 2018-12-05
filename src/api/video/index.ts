// https://docs.api.video/5.1/vod-tutorial/step-2-create-a-video-resource
const apiKey = 'OxrCq1NX7mx3ap8rWWa9U2vmPYeToPZQllroDzlK06g';

interface Auth {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

let auth: Auth;
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

interface VideoResourceInput {
  title: string;
  description: string;
}

interface VideoResource {
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

const createVideoResource = async (videoResourceInput: VideoResourceInput) => {
  console.log('createVideoResource', videoResourceInput);
  const videoResource: VideoResource = await fetch('https://ws.api.video/videos', {
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

interface Video {
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

export const uploadVideo = async (replayUrl: string) => {
  await authenticate();
  const videoResource = await createVideoResource({
    title: 'Raccoon Network - Highlight',
    description: 'TBA'
  });

  const blob = await loadVideo(replayUrl);

  console.log('uploadVideo', replayUrl, videoResource);
  const data = new FormData();
  data.append('file', blob);

  const video: Video = await fetch(`https://ws.api.video/videos/${videoResource.videoId}/source`, {
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
