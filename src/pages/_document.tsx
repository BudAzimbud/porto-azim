import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO meta tags */}
        <meta name="description" content="Azim Dev - Web and mobile developer specializing in React, Vue, Angular, and full-stack development. Portfolio and projects available." />
        <meta name="keywords" content="Azim, Azim Dev, Azim Cimahi, Azim Flashlight Games, React, Vue, Angular, Fullstack Developer, Web Developer, Mobile Developer" />
        <meta name="author" content="Azim" />
        <meta property="og:title" content="Azim - Web and Mobile Developer Portfolio" />
        <meta property="og:description" content="Azim Dev specializes in React, Vue, Angular, and full-stack development. Explore projects, skills, and more on his portfolio." />
        <meta property="og:url" content="https://porto-azim.vercel.app/" />
        <meta property="og:image" content="https://porto-azim.vercel.app/images/azim-profile.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AzimDev" />
        <meta name="twitter:title" content="Azim - Web and Mobile Developer Portfolio" />
        <meta name="twitter:description" content="Azim Dev specializes in React, Vue, Angular, and full-stack development. Explore projects, skills, and more on his portfolio." />
        <meta name="twitter:image" content="https://porto-azim.vercel.app/images/azim-profile.jpg" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
