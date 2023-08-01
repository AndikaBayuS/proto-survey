import Head from 'next/head'

import SurveyHome from '@/components/pages/Home'

export default function Home() {
  return (
    <>
      <Head>
        <title>ProtoSurvey</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <SurveyHome />
    </>
  )
}
