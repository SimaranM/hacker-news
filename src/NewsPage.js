import { useState, useEffect } from "react";
import axios from "axios";
import Newscard from "./components/NewsCard";
import ReactPaginate from "react-paginate";

const NewsPage = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoding] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    const handlePageChange = event => {
        console.log(event);
        setCurrentPage(event.selected);
    }

    useEffect(() => {
        setIsLoding(true);
        const fetchData = async () => {
            try {
                const { data } = await axios.get("https://hn.algolia.com/api/v1/search?");
                // console.log(data);
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
    }, [])

    return (
        <div className="container" >
            {/* <h1>Hacker News</h1> */}
            <div className="news-container">
                {
                    isLoading ? <p>Loading....</p> : articles.map(article =>
                        <Newscard article={article} key={article.objectID} />)
                }
            </div>
            <ReactPaginate nextLabel=">>" previousLabel="<<" breakLabel="..."
                forcePage={currentPage} pageCount={totalPages} renderOnZeroPageCount={null}
                onPageChange={handlePageChange} className="pagination"
                activeClassName="active-page" previousClassName="previous-page" nextClassName="next-page" />
        </div>
    )
}
export default NewsPage;