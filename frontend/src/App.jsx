
import './styles/App.css';
import ClientPage from './components/ClientSide/ClientPage';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LandingPage from './components/LandingPage';
import ProfileFreelancer from "./tmp/ProfileFreelancer";
import ProfileClient from "./tmp/ProfileClient";
import FreelancerPage from './components/FreelancerSide/FreelancerPage';
import FreelancerForm from './components/FreelancerSide/FreelancerForm';
import LeaderBoard from './components/FreelancerSide/LeaderBoard';

const routes = (
  <Router>
    <Routes>
    <Route path="/" exact element={<LandingPage />}/>
    <Route path="/client" exact element={<ClientPage />}/>
    <Route path="/profile" exact element={<ProfileFreelancer />} />
    <Route path="/profileClient" exact element={<ProfileClient />} />
    <Route path="/freelancer" exact element={<FreelancerPage />} />
    <Route path="/tmp" exact element={<LeaderBoard />} />
    </Routes>
  </Router>
)


function App() {
  return (
    <div className='min-h-screen w-screen flex flex-row items-center justify-center'>
      {routes}
    </div>
  );
}

export default App;
