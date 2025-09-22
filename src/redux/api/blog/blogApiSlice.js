import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../config";

export const blogApiSlice = createApi({
  reducerPath: "blogApi",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    return result;
  },
  tagTypes: ["Blog", "blog-categories", { type: "Blog", id: (id) => id._id }],
  endpoints: (builder) => ({
    category: builder.query({
      query: () => {
        return {
          url: `/blog/category/all`,
          method: "GET",
        };
      },
    }),
    getBlogs: builder.query({
      query: (options) => {
        return {
          url: `/blog/all?page=${options.page}&categoryId=${options.selectedCategory}&search=${options.debouncedValue}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [
        ...result.data.map(({ _id }) => ({ type: "Blog", id: _id })),
        "Blog",
      ],
    }),
    newsletter: builder.mutation({
      query: (body) => {
        return {
          url: "/blog/newsletter",
          method: "POST",
          body,
        };
      },
    }),
    likeContend: builder.mutation({
      query: (options) => {
        console.log("url: ", `${options.api}/like/${options.id}`);
        return {
          url: `${options.api}/like/${options.id}`,
          method: "PATCH",
          body: options.body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Blog", id: arg.id._id },
      ],
    }),
    disLikeContend: builder.mutation({
      query: (options) => {
        return {
          url: `${options.api}/dislike/${options.id}`,
          method: "PATCH",
          body: options.body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Blog", id: arg.id._id },
      ],
    }),
    postComment: builder.mutation({
      query: (data) => {
        return {
          url: "/blog/comment",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Blog", id: arg.blogId }];
      },
    }),
    removeComment: builder.mutation({
      query: (commentId) => {
        return {
          url: `/blog/comment/remove/${commentId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => {
        return [{ type: "Blog", id: arg.blogId }];
      },
    }),
  }),
});

export const {
  useCategoryQuery,
  useGetBlogsQuery,
  useNewsletterMutation,
  useLikeContendMutation,
  useDisLikeContendMutation,
  usePostCommentMutation,
  useRemoveCommentMutation,
} = blogApiSlice;
