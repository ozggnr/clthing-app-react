import { Routes, Route } from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/sign-in/sign-in.compoenent';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}> {/**Outlet will render whatever inside this */}
                <Route index element={<Home />} />
                <Route path='sign-in' element={<SignIn />} />
            </Route>
        </Routes>
    )
}

export default App;
