"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Post = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

const usePost = (id: { prevId: number; id: number }) => {
  return useQuery({
    queryKey: ["posts", id.id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id.id}`).then(
        (res) => res.json() as Promise<Post>
      ),
    placeholderData: (prevValue) => {
      return prevValue;
    },
    staleTime: 1000 * 60 * 10,
  });
};

const Test = () => {
  const simulateRerender = useState({ reRender: false });
  const [id, setId] = useState({ id: 1, prevId: Number.NEGATIVE_INFINITY });
  const post = usePost(id);

  useEffect(() => {
    console.log("fetching data", post);
  }, [post.isFetching]);
  useEffect(() => {
    console.log("re-rendering");
  }, [simulateRerender[0]]);

  return (
    <>
      <div>
        {post.data && (
          <>
            <strong>{post.data.title}</strong>
            <p>{post.data.body}</p>
          </>
        )}
        {post.isPlaceholderData && <>Loading...</>}
      </div>
      <form
        action={(formData: FormData) => {
          const id = Number(formData.get("id"));
          if (isNaN(id)) return;

          setId((prev) => ({ id, prevId: prev.id }));
        }}
      >
        <input type="number" name="id" className="text-black" />
      </form>
      <button
        onClick={() =>
          simulateRerender[1](
            (simulateRerender[0] = { reRender: !simulateRerender[0].reRender })
          )
        }
      >
        Re-render
      </button>
    </>
  );
};

export default Test;
