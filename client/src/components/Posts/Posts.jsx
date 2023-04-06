import React ,{useEffect,useState} from "react";
import "./posts.css";
import { Link } from "react-router-dom";
import axios from "../axios.js"
import Pusher from "pusher-js"


function Post(props) {
  
  const [posts, setPost] = useState([]);
  
  useEffect(() => {
    axios.get("/").then(({data : {data}}) => {
      console.log(data);
      setPost(data);
    });
  }, []);
  
  
  useEffect(() => {
    var pusher = new Pusher('f61e5bdfe988c057ac01', {
      cluster: 'ap2'
    });
    
    var channel = pusher.subscribe('posts');
    channel.bind('inserted', function(data) {
      setPost([ data,...posts]);
    });
    
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [posts]);


  return (
    <div className="cards">

      {posts.map((item, index) => {
        return (
          <div className="cards__item">
            <Link className="cards__item__link" to={`/posts/${item._id}`} state={item} >
              <figure className="cards__item__pic-wrap">
                <img className="cards__item__img" src={item.image} alt="img" />
              </figure>
              <div className="cards__item__info">
                <h5 className="cards__item__text">{item.title}</h5>
              </div>
            </Link>
          </div>
        );
      })}
   
    </div>
  );
}

export default Post;
