import { BrowserRouter as Router, Routes, Route } from 'react-router'
import TodoList from './todoList';
import SearchUsers from './searchUser';
import GuessNumber from './guessNumber';
import AutoFocus from './autoFocus';
import Header from './header';

function RouterComponent() {
    return (<>
        <Router>
            <Header/>
            <Routes>
                <Route path='/' element={<TodoList />}></Route>
                <Route path='/search-users' element={<SearchUsers />}></Route>
                <Route path='/guess-number' element={<GuessNumber />}></Route>
                <Route path='/auto-focus' element={<AutoFocus />}></Route>
            </Routes>
        </Router>
    </>)
}

export default RouterComponent;