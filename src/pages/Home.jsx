import PulseLoader from "react-spinners/PulseLoader";
import { Navbar } from "../components/Navbar";
import { RightNav } from "../components/RightNav";
import { Sidenav } from "../components/Sidenav";
import { useAuth } from "../context/auth-context";
import { usePost } from "../context/post-context";
import { DisplayPost } from "../components/DisplayPost";
import { FilterComponent } from "../components/FilterComponent";

export const Home = () => {
  const { postState } = usePost();
  const { authState } = useAuth();
  let userFeed = [];
  const followFeedPost = postState?.post?.filter(({ username }) => {
    const followUsernameArr = authState?.user?.following?.map(
      ({ username }) => username
    );
    return followUsernameArr?.includes(username);
  });

  userFeed = [
    ...userFeed,
    ...followFeedPost,
    ...postState?.post?.filter(
      ({ username }) => username === authState?.user?.username
    ),
  ];

  if (postState?.sortBy === "Trending") {
    userFeed = userFeed.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  } else if (postState?.sortBy === "Latest") {
    userFeed = userFeed.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />
        <div className="bg-primary-lightest py-5 mx-5 relative left-[15%] w-[60%] flex flex-col items-center rounded-xl ">
          <FilterComponent />
          {postState.postLoading ? (
            <PulseLoader color="var(--primary-color)" size={30} />
          ) : (
            <div className="mt-[30px]">
              {userFeed.length === 0 ? (
                <h1 className="font-bold text-3xl">No Posts to show.</h1>
              ) : (
                userFeed?.map((posts) => (
                  <div key={posts._id}>
                    <DisplayPost userPost={posts} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
        <RightNav />
      </div>
    </>
  );
};
