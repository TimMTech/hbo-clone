interface URL {
  src: string;
}

export const externalNextImageLoader = ({ src }: URL) => {
  return `https://image.tmdb.org/t/p/original${src}`;
};
