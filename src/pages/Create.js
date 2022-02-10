import CreateForm from '../components/CreateForm';
import Header from './../components/Header';

export default function Create() {
  return (
    <div className="container mx-auto max-w-md h-screen flex flex-col">
      <Header/>
      <CreateForm/>
    </div>
  )
}