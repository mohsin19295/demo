import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios'

function App() {
  const [post, setPost] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false);
  let limit = 20;
  const override = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "3e19ce7b891447459477f5ef54207823";
      try {
        setLoading(true);
        const res = await Axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=${apiKey}&page=${page}`);
        console.log('data', res?.data?.articles);
        setPost(res?.data?.articles);
        setTotal(Math.ceil(res.data?.totalResults / limit));
      } catch (error) {
        console.log('An error occurs while fetching', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const handlePrevious = () => {
    console.log('previous', total, page, limit)
    setPage(page - 1)
  }

  const handleNext = () => {
    console.log('next', total, page, limit)
    setPage(page + 1)
  }

  const formatDate = (dateString) => {
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };
  return (
    <div className="App">
      {post?.map(post => {
        const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
        const { urlToImage, publishedAt, url, title, source } = post;
        const imageUrl = post.urlToImage && !post.urlToImage.includes('cdn.videocardz.com')
          ? post.urlToImage
          : defaultImage

        return (
          <div key={post.id == null ? post.id = Math.random(1, 100) : post.id}>
            <img src={imageUrl} alt={urlToImage ? "urlToImage" : "No Image Available"} />
            <p className='title'>{title}</p>
            <p className='post-source'>{source.name == null ? source.name = "Unknown" : source.name}</p>
            <p className='post-date'>{formatDate(publishedAt)}</p>
            <a id="readMore" href={url} target="_blank" rel="noreferrer" >Read more</a>
          </div>
        )
      })}
    </div>
  );
}

export default App;
