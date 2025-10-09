import { Helmet } from "react-helmet-async"
import ConvertCarousel from "../components/ConvertCarousel"

function Home() {
  return (
    <div  className="">
      <Helmet>
        <title>ConvertForYou</title>
        <meta
          name="description"
          content="ConvertForYou.com | Free Online Utilities for URLs - Convert MP4, YouTube & Soundcloud to Mp3, shorten URLs, Convert jpg to png and more with Linkify."
        />
        <meta
          name="keywords"
          content="link, url, shorten, utilities, oasis, youtube, to, mp3, convert, YouTube, YT, MP3, audio, YouTube, link oasis, utils for links, utilities for links, ConvertForYou, linkify, free online, converter, free, online, free online converter, tools, tool, spotify download, Spotify, Soundcloud, download, downloader, image convert, jpg, png, gif, icon, ico"
        />
        <meta name="author" content="Damon Windsor" />
      </Helmet>
      <div className="mt-[10vh] sm:mt-[15vh] md:mt-[20vh]">
        <ConvertCarousel/>
      </div>

    </div>
  )
}

export default Home