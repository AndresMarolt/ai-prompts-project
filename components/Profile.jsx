import PromptCard from "./PromptCard"
import Image from "next/image"

const Profile = ({ name, desc, data, handleEdit, handleDelete, img }) => {
  return (
    <section className="w-full">
      <div className="flex flex-col justify-center max-md:items-center ">
        { img && <Image src={img} alt="Profile picture" className="rounded-full" height={80} width={80} /> }
        <h1 className="head_text text-left">
          <span className="blue_gradient">
            {name}
          </span>
        </h1>
      </div>

      <div className="mt-16 prompt_layout">
        { 
          data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          )) 
        }
      </div>
    </section>
  )
}

export default Profile