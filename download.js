const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        return reject(new Error('Failed to get status 200, got ' + response.statusCode));
      }

      const file = fs.createWriteStream(dest);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close(resolve);
      });
      
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// A highly reliable abstract tech video from Coverr
download('https://cdn.coverr.co/videos/coverr-abstract-blue-waves-5606/1080p.mp4', './public/bg.mp4')
  .then(() => console.log('Download complete'))
  .catch(err => {
    console.error('Failed to download from Coverr. Trying Pixabay fallback...');
    download('https://cdn.pixabay.com/video/2020/05/24/40065-424564881_large.mp4', './public/bg.mp4')
      .then(() => console.log('Download complete via Pixabay'))
      .catch(e => console.error('All downloads failed', e));
  });
