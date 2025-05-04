import Head from "next/head";
import Hero from "@/components/Hero";
import content from '@/data/content.json'
import AboutMe from '@/components/AboutMe';

export default function Home() {
  const { meta } = content;
  
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Hero />
      <AboutMe />
    </>
  );
}

