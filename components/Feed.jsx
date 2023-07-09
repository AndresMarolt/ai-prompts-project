"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"
import Spinner from "./Spinner"
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';
import DeleteMsg from "./toastifyMessages/DeleteMsg"

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    toast.warn(({ closeToast }) => <DeleteMsg posts={posts} postId={post._id} setPosts={setPosts} />);
  };

  if(loading) return <Spinner />
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text" 
          placeholder="Search for a prompt, tag or username" 
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {
        searchText ? (
          <div className="mt-16 prompt_layout">
            {
              searchResults.map((result) => (
                  <PromptCard 
                    key={result._id}
                    post={result}
                    handleTagClick={handleTagClick}
                  />
              ))
            }
          </div>
        ) : (
          <div className="mt-16 prompt_layout">
            {
              posts.map((post) => (
                <PromptCard
                  key={post._id}
                  post={post}
                  handleTagClick={handleTagClick}
                  handleDelete={() => handleDelete(post)}
                  handleEdit={() => handleEdit(post)}
                />
              ))
            }
          </div>
        )
      }
    </section>
  )
}

export default Feed