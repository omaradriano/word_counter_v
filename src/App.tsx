import Navigation from "./components/Navigation"
import Wordcounter from './components/WordCounter';
import Footer from './components/Footer';
import Stats from './components/Stats';

const App = () => {
    return(
        <>
            <Navigation/>
            <Wordcounter />
            <Footer/>
        </>
    )
}

export default App