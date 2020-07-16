import React from 'react';
import { useRouter } from 'next/router';
import Html from '@codeday/topo/Molecule/Html';
import { apiFetch } from '@codeday/topo/utils';
import Announcement from '@codeday/topo/Organism/Announcement';
import { NextSeo } from 'next-seo'
import Page from '../components/Page';
import SkellyPara from '../components/SkellyPara';
import NotFoundPage from '../components/NotFoundPage';
import PostHeader from '../components/PostHeader';

export default function Post({ post }) {
  const { isFallback, query } = useRouter();

  if (!post && !isFallback) {
    return <NotFoundPage />;
  }

  return (
    <Page
      slug={`/${query.slug}`}
      title={`${post?.title} ~ CodeDay Blog` || 'CodeDay Blog'}
      hero={<PostHeader post={post} isFallback={isFallback} />}
    >
      <NextSeo
        description={(post?.excerpt || '').replace(/[^a-zA-Z\.\-\,\_\!\; ]/, '')}
        openGraph={{
          images: [
            {
              url: post?.featuredImage?.sourceUrl,
            }
          ]
        }}
      />
      {post ? (
        <>
          <Html>{post.content}</Html>
          <Announcement box mt={16} />
        </>
      ) : [...Array(Math.ceil(Math.random() * 5) + 3)].map(() => <SkellyPara />)}
    </Page>
  );
}

const postQuery = (id) => `{
  blog {
    post( id: "${id.replace(/[^a-zA-Z0-9\-_]/, '')}", idType: SLUG ) {
      title
      content
      date
      featuredImage {
        sourceUrl(size:LARGE)
        srcSet
      }
      author {
        name
      }
      categories {
        nodes {
          slug
          name
          display {
            color
          }
        }
      }
    }
  }
}`;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { post } = (await apiFetch(postQuery(slug))).blog;
  return {
    props: {
      post,
    },
    unstable_revalidate: 120,
  };
}
