import React from 'react'
import Feed from './components/Feed'
import NewPost from './components/NewPost'
import fetchPosts from './lib/fetchPosts'
import { fetchUserbyPostId } from './lib/fetchUser'
import { Metadata } from 'next'
import { checkUser } from './lib/checkUser'
import { redirect } from 'next/navigation';



type Post = {
  id: string;
  title: string;
  content: string;
  userId: string;
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Latest Feed",
  description: "Social media but not",
};

async function page() {

  const user = await checkUser()

  if (user.needsUsername) {
    redirect('/edit-profile')
  }
  const posts = await fetchPosts()
  const userPromises = posts.map((post: Post) =>
    fetchUserbyPostId({ postUserId: post.userId }).then(user => ({
      post,
      user
    }))
  )
  const postUserData = await Promise.all(userPromises)

  const fullPosts = postUserData.map(({ post, user }) => ({
    ...post,
    name: user?.name || "unknown user",
    imageUrl: user?.imageUrl,
    iD: user?.id
  }))

  return (
    <div className="flex">
      <Feed posts={fullPosts} />
      <div className="bottom-5 rounded-lg right-5 p-2 bg-purple-500 hover:bg-purple-700 flex fixed">
        <NewPost />
      </div>
    </div>
  )
}

export default page