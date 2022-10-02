import { useState, useEffect } from "react";
import axios from "axios";
import Newscard from "./components/NewsCard";
import ReactPaginate from "react-paginate";

const NewsPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [articles, setArticles] = useState([]);
    // ----------loading-------
    const [isLoading, setIsLoding] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    // search-------start-------------
    const [query, setQuery] = useState("");
    const [searchInput, setSearchInput] = useState("");
    // search----end----------------
    // ------------------pagination-----
    const handlePageChange = (event) => {
        console.log(event);
        setCurrentPage(event.selected);
    };

    // search----start----------------
    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(0);
        setQuery(searchInput);
    };
    // search----end----------------

    useEffect(() => {
        setIsLoding(true);
        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://hn.algolia.com/api/v1/search?", {
                    params: { page: currentPage, query },
                });
                console.log(data);
                const { hits, nbPages } = data;
                setArticles(hits);
                setTotalPages(nbPages);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoding(false);
            }
        };
        fetchData();
    }, [currentPage, query]);

    return (
        <>
            <div className='navbar'>
                <div className='logo'>
                    <img src={"https://www.digital-adoption.com/wp-content/uploads/2019/06/Hacker-News-logo.png"} />
                </div>

                <div className='menu-items'>
                    <div className='menu_name'>New</div>
                    <div className='menu_name'>Past</div>
                    <div className='menu_name'>Comments</div>
                    <div className='menu_name'>Ask</div>
                    <div className='menu_name'>Show</div>
                    <div className='menu_name'>Jobs</div>
                </div>
                <div className='icon'>
                    {/* <h1>Hacker News</h1> */}
                    {/* search -----start */}

                    <form className='search-form' onSubmit={handleSubmit}>
                        <input type='text' name='' id='' placeholder='Search hear..' value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
                        {/* <button type='submit' className="btn"> */}
                        <i class='fa fa-search' aria-hidden='true'></i>
                    </form>
                    {/* search -----end */}
                </div>
            </div>
            <div className='container'>
                <div className='news-container'>{isLoading ? <p className='loader'>Loading....</p> : articles.map((article) => <Newscard article={article} key={article.objectID} />)}</div>

                <ReactPaginate
                    nextLabel='>>'
                    previousLabel='<<'
                    breakLabel='...'
                    forcePage={currentPage}
                    pageCount={totalPages}
                    renderOnZeroPageCount={null}
                    onPageChange={handlePageChange}
                    className='pagination'
                    activeClassName='active-page'
                    previousClassName='previous-page'
                    nextClassName='next-page'
                />
            </div>
        </>
    );
};
export default NewsPage;
