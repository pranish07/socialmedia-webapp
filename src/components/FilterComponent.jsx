import { usePost } from "../context/post-context";

export const FilterComponent = () => {
  const { postDispatch, postState } = usePost();
  return (
    <div>
      <div className="flex justify-around w-[400px] mt-[20px] text-lg xs:w-[300px]">
        <button
          className="hover:text-primary-color hover:underline"
          onClick={() => postDispatch({ type: "SORT", payload: "Trending" })}
        >
         Trending
        </button>
        <button
          className="hover:text-primary-color hover:underline"
          onClick={() => postDispatch({ type: "SORT", payload: "Latest" })}
        >
           Latest
        </button>
      </div>
      {postState.sortBy && (
        <h1 className="text-center mt-[30px] font-bold text-3xl ">
          {postState?.sortBy} Posts
        </h1>
      )}
    </div>
  );
};
