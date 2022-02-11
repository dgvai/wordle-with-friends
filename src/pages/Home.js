import Header from './../components/Header';
import MainMenu from './../components/MainMenu';

export default function Home() {
  return (
    <div className="container mx-auto max-w-md h-screen flex flex-col">
      <Header/>
      <MainMenu/>
    </div>
  )
}