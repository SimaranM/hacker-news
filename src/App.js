import './App.css';
import hackerNews from './hackernews.json';
import NewsPage from './NewsPage';
import Navbar from './components/Navbar';

function App() {
  console.log(hackerNews)
  
  return (
    <>
      <Navbar />
      <div className="App">
        <NewsPage />
      </div>
    </>
  );
}

export default App;
