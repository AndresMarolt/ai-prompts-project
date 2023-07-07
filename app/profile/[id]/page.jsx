"use client"

import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useRouter } from "next/navigation";
import Spinner from "@components/Spinner";

export async function generateMetadata({ params }) {
  const userData = await fetch(`/api/users/${params.id}`);
  const user = await userData.json();

  return {
    title: `${user.username}`
  }
}

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
    const hasConfirmed = confirm("¿Seguro que desea eliminar este prompt?");
    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if(loading) return <Spinner />
  return (
    <Profile
      name={profileOwner.username}
      img={profileOwner.image}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;