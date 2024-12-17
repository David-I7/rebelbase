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
      console.log(pageParam);
      return fetch(
        `https://jsonplaceholder.typicode.com/posts/${pageParam}`
      ).then((res) => res.json() as Promise<Post>);
    },
    initialPageParam: undefined,
    initialData: () => ({
      pageParams: [0],
      pages: [{ title: "Jibberish", body: "hello world", id: 0 }],
    }),
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return undefined;
    },
    staleTime: 1000 * 60 * 60,
    enabled: false,
  });
};

const TestUseInfiniteQuery = () => {
  const posts = usePost();

  console.log(posts.hasNextPage, posts.isFetching);

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
