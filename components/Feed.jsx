"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import Spinner from "./Spinner"

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      { 
        data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        )) 
      }
    </div>
  )
}

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, [])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };
  
  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
    const searchResult = filterPrompts(e.target.value);
    setSearchResults(searchResult);
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  }

  if(loading) return <Spinner />
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text" 
          placeholder="Search for a tag or username" 
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {
        searchText ? (
          <PromptCardList 
            data={searchResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList data={posts} handleTagClick={handleTagClick} />
        )
      }
    </section>
  )
}

export default Feed