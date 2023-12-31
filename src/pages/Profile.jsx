import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { RightNav } from "../components/RightNav";
import { Sidenav } from "../components/Sidenav";
import { useAuth } from "../context/auth-context";
import { useUser } from "../context/user-context";
import { usePost } from "../context/post-context";
import { DisplayPost } from "../components/DisplayPost";
import { FollowCount } from "../components/FollowCount";
import { EditProfile } from "../components/EditProfileModal";

export const Profile = () => {
  const { username } = useParams();
  const { authState, userLogout } = useAuth();
  const { postState, getUserPost } = usePost();
  const { userState, followUser, unfollowUser } = useUser();
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState({
    show: false,
    type: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);

  const getUserDetails = async () => {
    try {
      setUsersLoading(true);
      const { data, status } = await axios({
        method: "GET",
        url: `/api/users/${username}`,
      });
      if (status === 200 || status === 201) {
        setUserData(data?.user);
        getUserPost(username);
        setUsersLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, userState, postState?.post]);

  const isFollowed = (userId) =>
    userState
      ?.find((user) => user._id === userId)
      ?.followers.some((user) => user._id === authState?.user?._id);

  return (
    <div className="relative">
      {showModal.show && (
        <FollowCount
          arr={
            showModal.type === "Following"
              ? userData.following
              : userData.followers
          }
          setShowModal={setShowModal}
          showModal={showModal}
        />
      )}
      {showEditModal && (
        <EditProfile
          userObj={userData}
          setShowEditModal={setShowEditModal}
          showEditModal={showEditModal}
        />
      )}
      <div
        style={{ filter: showModal.show || showEditModal ? "blur(8px)" : "" }}
      >
        <Navbar />
        <div className="flex">
          <Sidenav />
          <div className="min-h-screen bg-primary-lightest py-5 mx-5 relative left-[15%] w-[65%] flex flex-col items-center rounded-xl ">
            {usersLoading ? (
              <PulseLoader color="var(--primary-color)" size={30} />
            ) : (
              <div className="w-[600px] lg:w-[500px] md:w-[380px] xs:w-[320px]">
                <div className="flex items-center justify-between xs:text-[14px]">
                  <div className="flex items-center">
                    <img
                      src={userData?.avatarUrl}
                      alt="avatar"
                      className="w-[60px] h-[60px] mr-2 rounded-full"
                    />

                    <div>
                      <h1 className="font-bold">{`${userData?.firstName} ${userData?.lastName}`}</h1>
                      <p className="text-sm">@{userData?.username}</p>
                    </div>
                  </div>

                  {userData?.username === authState?.user?.username ? (
                    <div className="px-4 py-2 w-[90px] flex justify-between rounded-lg">
                      <i
                        onClick={() => setShowEditModal(true)}
                        className="fa-solid fa-pen fa-md cursor-pointer hover:text-primary-color"
                      ></i>
                      <i
                        onClick={() => userLogout()}
                        className="fa-solid fa-arrow-right-from-bracket cursor-pointer hover:text-primary-color"
                      ></i>
                    </div>
                  ) : isFollowed(userData?._id) ? (
                    <button
                      onClick={() => unfollowUser(userData?._id)}
                      className=" text-primary-color border-2 border-primary-color text-sm px-4 py-2 hover:bg-primary-color hover:text-white rounded-lg"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={() => followUser(userData?._id)}
                      className="bg-primary-color text-white text-sm px-4 py-2 hover:bg-primary-dark rounded-lg"
                    >
                      <i className="fa-solid fa-plus fa-xs"></i> Follow
                    </button>
                  )}
                </div>

                {userData?.bio && (
                  <p className="my-px mt-2 text-[15px]">
                    <i className="fa-brands fa-pagelines w-[60px] text-center text-xl"></i>
                    {userData?.bio}
                  </p>
                )}

                {userData?.website && (
                  <a
                    href={userData?.website}
                    target="_blank"
                    className="text-[15px] my-2 hover:underline decoration-blue-400"
                    rel="noreferrer"
                  >
                    <i class="fa-solid fa-link w-[60px] text-center"></i>
                    {userData?.username}.com
                  </a>
                )}

                <p className="my-2 text-[15px]">
                  <i className="fa-regular fa-calendar w-[60px] text-center"></i>
                  Joined{" "}
                  {` ${new Date(userData?.createdAt)
                    .toDateString()
                    .split(" ")
                    .slice(1, 4)
                    .join(" ")}`}
                </p>

                <div className="pl-[25px] flex justify-between w-[300px]">
                  <p>
                    {postState?.userPost?.length +
                      `${
                        postState?.userPost?.length === 1 ? " Post" : " Posts"
                      }`}
                  </p>
                  <p
                    className="hover:underline cursor-pointer"
                    onClick={() =>
                      setShowModal((showModal) => ({
                        ...showModal,
                        show: true,
                        type: "Followers",
                      }))
                    }
                  >
                    {userData?.followers?.length +
                      `${
                        userData?.followers?.length === 1
                          ? " Follower"
                          : " Followers"
                      }`}
                  </p>
                  <p
                    className="hover:underline cursor-pointer"
                    onClick={() =>
                      setShowModal((showModal) => ({
                        ...showModal,
                        show: true,
                        type: "Following",
                      }))
                    }
                  >
                    {userData?.following?.length +
                      `${
                        userData?.following?.length === 1
                          ? " Following"
                          : " Followings"
                      }`}
                  </p>
                </div>

                <hr className="my-5" />

                {postState?.userPost?.map((post) => (
                  <div>
                    <DisplayPost userPost={post} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <RightNav />
        </div>
      </div>
    </div>
  );
};
