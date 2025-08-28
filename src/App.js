import { jsx as _jsx } from "react/jsx-runtime";
import './styles/App.css';
import UserList from './components/UserList/UserList';
function App() {
    return (_jsx("div", { children: _jsx(UserList, {}) }));
}
export default App;
