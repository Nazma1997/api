import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [pages, setPages] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/pages").then((response) => {
      setPages(response.data);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5000/api/pages", { title, url, body }).then((response) => {
      setPages([...pages, response.data]);
      setTitle("");
      setUrl("");
      setBody("");
    });
  };

  const handleDelete = (_id) => {
    axios.delete(`http://localhost:5000/api/pages/${_id}`).then(() => {
      setPages(pages.filter((page) => page.url !== url));
    });
  };

  return (
    <div>
      <h1>CMS</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
        <label htmlFor="body">Body:</label>
        <textarea
         
         id="body"
         name="body"
         value={body}
         onChange={(event) => setBody(event.target.value)}
       ></textarea>
       <button type="submit">Save</button>
     </form>
     <ul>
       {pages.map((page) => (
         <li key={page.url}>
           <a href={page.url}>{page.title}</a>{" "}
           <button onClick={() => handleDelete(page._id)}>Delete</button>
         </li>
       ))}
     </ul>
   </div>
   );
   };
   
   export default App;