import axios from "axios";
// import { toast } from "react-toastify";

export const getPostData = async (dataDispatch, setIsLoading) => {
  try {
    const {
      status,
      data: { posts },
    } = await axios.get(`/api/posts`);
    if (status === 200 || status === 201) {
      dataDispatch({ type: "ALL_POST_DATA", payload: posts });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

export const getUserData = async (dataDispatch, setIsLoading) => {
  try {
    const {
      status,
      data: { users },
    } = await axios.get("/api/users");
    if (status === 200 || status === 201) {
      dataDispatch({ type: "ALL_USER_DATA", payload: users });
    }
  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};
