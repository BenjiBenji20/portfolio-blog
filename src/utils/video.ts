export const isYouTube = (url: string) => url.includes('youtube.com') || url.includes('youtu.be');

export const getYouTubeId = (url: string) => {
   const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
   return match ? match[1] : null;
};

export const getVimeoId = (url: string) => {
  const match = url.match(/vimeo\.com\/(?:.*#|.*\/videos\/)?([0-9]+)/);
  return match ? match[1] : null;
};
