import React from 'react';
import Head from 'next/head'
import type { NextPage } from 'next'
import Error from 'next/error';

const Portfolio: NextPage = () => {
  return (
    <>
      <Head>
        <title>Helix</title>
      </Head>
      <div>
        <Error statusCode={404} />
      </div>
    </>
  )
}

export default Portfolio;
