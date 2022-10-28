import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home({post}) {
  console.log(post)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      
      </main>
    </div>
  )
}

export async function getStaticProps () {
  const post = await fetch('https://back-portofolio.unetaupechezvous.fr/public/api/categories')
      .then((res) => res.json())
  return {props : {post}}
}