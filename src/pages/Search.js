import SearchBar from '../components/SearchBar';
import image from '../images/Figma-Search-Background.jpg'
import Header from "../components/Header";
import { LoginInfo } from "../global-objects/LoginInfo";

function Search () {
    return(
        <main style={{backgroundImage: `url(${image})`, backgroundPosition:"center", backgroundSize:"100%"}}>
            <Header info={LoginInfo} />
            <div className='flex items-center justify-center h-screen'>
                <SearchBar />
            </div>
        </main>
    )
}

export default Search;