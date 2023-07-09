const DeleteMsg = ({ closeToast, toastProps, posts, postId, setPosts }) => (
  <div>
    <h3>Are you sure you want to delete this prompt?</h3>
    <div className="flex justify-center gap-3 align-middle w-full mx-auto my-3">
      <button className="toastify_btn toastify_btn-accept" onClick={async () => {
        try {
          await fetch(`/api/prompt/${postId.toString()}`, {
            method: 'DELETE',
          });

          const filteredPosts = posts.filter((p) => p._id !== postId);
          setPosts(filteredPosts);
          closeToast();
        } catch (error) {
          console.log(error);
        }
      }}>
        Accept
      </button>
      <button className="toastify_btn toastify_btn-cancel" onClick={closeToast}>
        Cancel
      </button>
    </div>
  </div>
)

export default DeleteMsg;