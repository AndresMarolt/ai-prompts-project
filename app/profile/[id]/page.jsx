"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import Profile from "@components/Profile";
import Spinner from "@components/Spinner";
import { toast } from 'react-toastify';
import DeleteMsg from "@components/toastifyMessages/DeleteMsg";

const MyProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const [profileOwner, setProfileOwner] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const responsePosts = await fetch(`/api/users/${params.id}/posts`);
      const responseUser = await fetch(`/api/users/${params.id}`);
      const postsData = await responsePosts.json();
      const usersData = await responseUser.json();
      setPosts(postsData);
      setProfileOwner(usersData);
      setLoading(false);
    }
    fetchPosts();
  }, [params])

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    toast.warn(({ closeToast }) => <DeleteMsg  posts={posts} postId={post._id} setPosts={setPosts} />);
  }

  if(loading) return <Spinner />
  return (
    <>
      <Profile
        name={profileOwner.username}
        img={profileOwner.image}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  )
}

export default MyProfile;