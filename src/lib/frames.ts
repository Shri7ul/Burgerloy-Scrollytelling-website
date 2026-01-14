import fs from 'fs';
import path from 'path';

export async function getFrames(animationFolder: string): Promise<string[]> {
  const dir = path.join(process.cwd(), 'public', animationFolder);
  
  if (!fs.existsSync(dir)) {
    console.warn(`Directory not found: ${dir}`);
    return [];
  }

  const files = await fs.promises.readdir(dir);

  return files
    .filter((file) => file.endsWith('.webp'))
    .sort((a, b) => {
      // Natural sort for filenames like frame1.webp, frame2.webp, frame10.webp
      return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
    })
    .map((file) => `/${animationFolder}/${file}`);
}
