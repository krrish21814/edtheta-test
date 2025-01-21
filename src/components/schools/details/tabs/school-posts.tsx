/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface Post {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: Array<{
    id: string;
    author: string;
    text: string;
  }>;
  date: string;
}

interface SchoolPostsProps {
  school: any;
}

export function SchoolPosts({ school }: SchoolPostsProps) {
  // State for likes and bookmarks
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(
    new Set()
  );
  const [showComments, setShowComments] = useState<Set<string>>(new Set());

  // Dummy data
  const dummyPosts: Post[] = [
    {
      id: "1",
      author: {
        name: "School Sports Team",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sports",
      },
      image:
        "https://imgcdn.stablediffusionweb.com/2024/4/12/e3593afc-eaab-452e-9114-adfa1ead4ea7.jpg",
      caption:
        "Incredible victory at the inter-school championships! 🏆 Our team showed amazing spirit and determination. Swipe to see more highlights from the game! #SchoolSports #Champions",
      likes: 245,
      comments: [
        {
          id: "c1",
          author: "Coach Smith",
          text: "So proud of our team! 👏",
        },
        {
          id: "c2",
          author: "Parent Council",
          text: "What an amazing achievement! Congratulations to all!",
        },
      ],
      date: "2024-01-15",
    },
    {
      id: "2",
      author: {
        name: "Science Department",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Science",
      },
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrSicugfTGxwXThT78DwznOqezpWlC5WyUxQ&s",
      caption:
        "Our students creating amazing projects in the science lab today! 🧪 Learning through experimentation is the best way! #ScienceEducation #STEM",
      likes: 188,
      comments: [
        {
          id: "c3",
          author: "Ms. Johnson",
          text: "Great work everyone! The projects look fantastic!",
        },
      ],
      date: "2024-01-14",
    },
    {
      id: "1",
      author: {
        name: "School Sports Team",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sports",
      },
      image:
        "https://imgcdn.stablediffusionweb.com/2024/4/12/e3593afc-eaab-452e-9114-adfa1ead4ea7.jpg",
      caption:
        "Incredible victory at the inter-school championships! 🏆 Our team showed amazing spirit and determination. Swipe to see more highlights from the game! #SchoolSports #Champions",
      likes: 245,
      comments: [
        {
          id: "c1",
          author: "Coach Smith",
          text: "So proud of our team! 👏",
        },
        {
          id: "c2",
          author: "Parent Council",
          text: "What an amazing achievement! Congratulations to all!",
        },
      ],
      date: "2024-01-15",
    },
    {
      id: "2",
      author: {
        name: "Science Department",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Science",
      },
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrSicugfTGxwXThT78DwznOqezpWlC5WyUxQ&s",
      caption:
        "Our students creating amazing projects in the science lab today! 🧪 Learning through experimentation is the best way! #ScienceEducation #STEM",
      likes: 188,
      comments: [
        {
          id: "c3",
          author: "Ms. Johnson",
          text: "Great work everyone! The projects look fantastic!",
        },
      ],
      date: "2024-01-14",
    },
  ];

  const formatDate = (dateString: string) => {
    const days = Math.floor(
      (new Date().getTime() - new Date(dateString).getTime()) /
        (1000 * 3600 * 24)
    );
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return new Date(dateString).toLocaleDateString();
  };

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (postId: string) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleComments = (postId: string) => {
    setShowComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className=' mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 '>
      {dummyPosts.map((post) => (
        <Card key={post.id} className='border-none shadow-sm'>
          {/* <CardHeader className='flex flex-row items-center space-x-4 p-4'></CardHeader> */}

          {/* Image */}
          <div className='relative aspect-square'>
            <img
              src={post.image}
              alt='Post'
              className='object-cover w-full h-full rounded-t-lg'
            />
          </div>

          <CardContent className='p-4'>
            {/* Action buttons */}
            <div className='flex justify-between mb-4'>
              <div className='flex space-x-4'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => toggleLike(post.id)}>
                  <Heart
                    className={`h-6 w-6 ${
                      likedPosts.has(post.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => toggleComments(post.id)}>
                  <MessageCircle className='h-6 w-6' />
                </Button>
                <Button variant='ghost' size='icon'>
                  <Send className='h-6 w-6' />
                </Button>
              </div>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => toggleBookmark(post.id)}>
                <Bookmark
                  className={`h-6 w-6 ${
                    bookmarkedPosts.has(post.id) ? "fill-black" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Likes */}
            <p className='font-semibold text-sm mb-2'>
              {post.likes + (likedPosts.has(post.id) ? 1 : 0)} likes
            </p>

            {/* Caption */}
            <div className='space-y-1'>
              <p className='text-sm'>
                <span className='font-semibold mr-2'>{post.author.name}</span>
                {post.caption}
              </p>
              <p className='text-xs text-gray-500'>{formatDate(post.date)}</p>
            </div>
          </CardContent>

          {/* Comments */}
          {showComments.has(post.id) && (
            <CardFooter className='p-4 pt-0 flex flex-col space-y-4'>
              <div className='w-full space-y-2'>
                {post.comments.map((comment) => (
                  <div key={comment.id} className='flex items-start space-x-2'>
                    <p className='text-sm'>
                      <span className='font-semibold'>{comment.author}</span>{" "}
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>
              <div className='flex w-full space-x-2'>
                <Input placeholder='Add a comment...' className='flex-1' />
                <Button variant='ghost' size='sm'>
                  Post
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
