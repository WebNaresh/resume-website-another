"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

const Blog = async () => {
  const data = [
    {
      _id: "649a8878ff9a1cf67eb38066",
      title: "testClient ",
      desc: "testClient ",
      content: "testClient ",
      username: "Naresh",
      image:
        "https://images.pexels.com/photos/14833258/pexels-photo-14833258.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      createdAt: "2023-06-27T06:58:00.823Z",
      updatedAt: "2023-06-27T06:58:00.823Z",
      __v: 0,
    },
    {
      _id: "649a8c6cff9a1cf67eb38089",
      title: "fsd",
      desc: "fsd",
      content: "fsdc",
      username: "Naresh",
      image:
        "https://images.pexels.com/photos/17168346/pexels-photo-17168346/free-photo-of-flight-summer-sun-high.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      createdAt: "2023-06-27T07:14:52.919Z",
      updatedAt: "2023-06-27T07:14:52.919Z",
      __v: 0,
    },
    {
      _id: "649a8c8dff9a1cf67eb3808d",
      title: "fsd",
      desc: "fsd",
      content: "fsdc",
      username: "Naresh",
      image:
        "https://images.pexels.com/photos/17168346/pexels-photo-17168346/free-photo-of-flight-summer-sun-high.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      createdAt: "2023-06-27T07:15:25.964Z",
      updatedAt: "2023-06-27T07:15:25.964Z",
      __v: 0,
    },
  ];
  return (
    <div className={styles.mainContainer}>
      {data?.map((ele, i) => {
        return (
          <Link href={`/blog/${ele._id}`} className={styles.container} key={i}>
            <div className={styles.imageContainer}>
              <Image
                src={ele.image}
                alt="its"
                width={400}
                height={250}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h1 className={styles.title}>{ele.title} </h1>
              <p className={styles.desc}> {ele.content} </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Blog;
