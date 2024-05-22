import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  async function fetchAndUpdateData() {
    setLoading(true);
    try {
      
        let res = await axios({
          method: 'get',
          url: 'https://jsonplaceholder.typicode.com/posts',
        })
      setLoading(false)
      console.log(res.data)
      setPosts(res.data)
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(()=>{
    fetchAndUpdateData()

    function cleanUP(){
      fetchAndUpdateData()
    }
    return cleanUP;
  },[]);


  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <h1>List of Posts</h1>

      {posts.map((post)=>(
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

export default Posts;
