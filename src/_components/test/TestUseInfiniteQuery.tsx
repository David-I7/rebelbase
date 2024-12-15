"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";

type Post = {
  userId: string;
  id: number;
  title: string;
  body: string;
};

const usePost = () => {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      return fetch(
        `https://jsonplaceholder.typicode.com/posts/${pageParam}`
      ).then((res) => res.json() as Promise<Post>);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPageParam + 1;
    },
    staleTime: 1000 * 60 * 60,
    enabled: false,
  });
};

const TestUseInfiniteQuery = () => {
  const posts = usePost();

  if (posts.error) return <h2>Error</h2>;

  return (
    <>
      <div>
        {posts.data?.pages.map((post) => (
          <div key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      {posts.isFetchingNextPage && <>Loading...</>}
      <button onClick={() => posts.fetchNextPage()}>Next Page</button>
    </>
  );
};

export default TestUseInfiniteQuery;
