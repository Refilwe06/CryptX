import './SearchBar.css';
const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" placeholder="Search type of keywords" />
            <img src={`${process.env.PUBLIC_URL}/search.svg`} alt="Search Icon" />
        </div>
    )
}

export default SearchBar