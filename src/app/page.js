import Navigate from './components/Navigate';
import PlayGrid from './components/PlayGrid';
import './globals.css';

export default function Home() {
  return (
    <div>
      <Navigate />
      <h1 className="title">SimplySolo</h1>
      <PlayGrid />
    </div>
  );
}
