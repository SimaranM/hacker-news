const NewsCard = ({ article }) => {
    if (!article.title) return null;
    return (
        <>
            <div className="news-card">
                <div className="news-card_text">
                    <h3> <i class="fa fa-caret-up" aria-hidden="true"></i> {article.title} </h3>
                    <a href={article.url}>Read More</a>
                </div>
                <div className="news-card_inner">
                    <p className="news-points">Author : {article.author}</p>
                    <p className="news-points">points : {article.points}</p>
                </div>
            </div>

        </>
    )
};
export default NewsCard;