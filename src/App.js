
import './App.css';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';


function App() {

  const [posts, setPost] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const limit = 10
  useEffect(() => {
    const getPost = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`);
      const data = await response.json();
      setPost(data);
      let total = response.headers.get('x-total-count');
      setPageCount(Math.ceil(total / limit));
    }
    getPost();
  }, [])

  const fetchPost = async (currentPage) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`);
    const data = await response.json();
    return data;
  }

  const handlePageClick = async (data) => {
    console.log(data.selected)
    let currentPage = data.selected + 1;
    const loadPost = await fetchPost(currentPage);
    setPost(loadPost)
  }
  return (
    <div className='container'>
      <div className='row m-2'>
        {
          posts.map(item => {
            return (
              <div key={item.id} className='col-sm-6 col-md-4 v my-2'>
                <div className='card-group'>
                  <div className='card'>
                    <div className='card-body'>
                      <h4 className='card-title'>#{item.id} : {item.title}</h4>
                      <p className='card-text'>{item.body}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <br />
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination justify-content-center'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );
}

export default App;
