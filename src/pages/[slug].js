import React from 'react';
import { useRouter } from 'next/router';
import Html from '@codeday/topo/Molecule/Html';
import Text, { Link } from '@codeday/topo/Atom/Text';
import { apiFetch } from '@codeday/topo/utils';
import Announcement from '@codeday/topo/Organism/Announcement';
import { NextSeo } from 'next-seo'
import moment from 'moment';
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
          <Text mt={16} bold>
            If you liked this post, an easy way to support our work is to follow us on{' '}
            <Link href="https://www.linkedin.com/company/codeday-org/" color="blue.800" target="_blank">LinkedIn</Link>
            {' '} or <Link href="https://twitter.com/codeday" target="_blank" color="blue.800">Twitter</Link>. We often
            post volunteer and mentor opportunities.
          </Text>
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
        picture
        username
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
  if (post) {
    post.date = moment(post.date).format('MMMM DD, YYYY');
  }

  return {
    props: {
      post,
    },
    unstable_revalidate: 120,
  };
}
