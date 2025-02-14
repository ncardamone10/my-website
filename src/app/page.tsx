import ImageCarousel from './ImageCarousel';
import path from 'path';
import fs from 'fs';


export default async function HomePage() {
  const imagesDirectory = path.join(process.cwd(), 'public/images/homepage');
  const imageFiles = fs
    .readdirSync(imagesDirectory)
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
    .map((file) => `/images/homepage/${file}`);

  return <ImageCarousel images={imageFiles} />;
}
