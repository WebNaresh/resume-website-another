"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import styles from "./page.module.css";

const Dashboard = () => {
  const session = useSession();
  console.log(`🚀 ~ session:`, session);
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user?.name}`,
    fetcher
  );

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router?.push("/dashboard/login");
    }
  }, [router, session.status]);
  if (session.status === "loading") {
    return <p> Loading .....</p>;
  }
  const handlSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;
    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          image: img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {}
  };

  if (session.status === "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.posts}>
          {isLoading
            ? "loading"
            : data?.map((post, i) => {
                return (
                  <div className={styles.post} key={i}>
                    <div className={styles.imgContainer}>
                      <Image width={200} height={100} src={post.image} alt="" />
                    </div>
                    <h2 className={styles.postTitle}> {post.title}</h2>
                    <span
                      className={styles.delete}
                      onClick={() => handleDelete(post._id)}
                    >
                      X
                    </span>
                  </div>
                );
              })}
        </div>
        <form className={styles.new} onSubmit={handlSubmit}>
          <h1>Add New Post</h1>
          <input type="text" placeholder="Title" className={styles.input} />
          <input type="text" placeholder="Desc" className={styles.input} />
          <input type="text" placeholder="Image" className={styles.input} />
          <textarea
            placeholder="Content"
            className={styles.textArea}
            cols="30"
            rows="10"
          ></textarea>
          <button className={styles.button}> Send</button>
        </form>
      </div>
    );
  }
  return <p>load</p>;
};

export default Dashboard;
