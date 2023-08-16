export const handleShare = async (_id) => {
  try {
    await navigator.share({
      title: "Involve",
      text: "Check out this post",
      url: `https://involve-socialmedia.netlify.app/post/${_id}`,
    });
  } catch (error) {
    console.error("Error sharing:", error);
  }
};
