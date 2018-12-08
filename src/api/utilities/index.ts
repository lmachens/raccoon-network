const times: Array<[string, number]> = [
  ['second', 1],
  ['minute', 60],
  ['hour', 3600],
  ['day', 86400],
  ['week', 604800],
  ['month', 2592000],
  ['year', 31536000]
];

export const timeAgo = (date: Date) => {
  let diff = Math.round((Date.now() - date.getTime()) / 1000);
  for (let t = 0; t < times.length; t++) {
    if (diff < times[t][1]) {
      if (t === 0) {
        return 'Just now';
      } else {
        diff = Math.round(diff / times[t - 1][1]);
        return diff + ' ' + times[t - 1][0] + (diff === 1 ? ' ago' : 's ago');
      }
    }
  }
};

export const sortEvent = (a, b) => {
  return b.timestamp - a.timestamp;
};
