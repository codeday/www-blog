import React from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import Skelly from '@codeday/topo/Atom/Skelly';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Box from '@codeday/topo/Atom/Box';
import Html from '@codeday/topo/Molecule/Html';
import { apiFetch } from '@codeday/topo/utils';
import { NextSeo } from 'next-seo'
import Image from '@codeday/topo/Atom/Image';
import Page from '../components/Page';
import SkellyPara from '../components/SkellyPara';

export default function Post({ post }) {
  const { isFallback, query } = useRouter();

  const primaryCategory = post?.categories?.nodes[0];

  return (
    <Page slug={`/${query.slug}`} title={`${post?.title} ~ CodeDay Blog` || 'CodeDay Blog'}>
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
      {!post && (<Skelly height="2xs" />)}
      {post?.featuredImage && (
        <Box height="2xs" mt={-8} mb={4} borderRadius={4} style={{ overflow: 'hidden' }}>
          <Image
            style={{ objectFit: 'cover', objectPosition: '50% 50%'}}
            width="100%"
            height="100%"
            src={post.featuredImage.sourceUrl}
          />
        </Box>
      )}
      {!post && (<Skelly width="2xs" height={8} />)}
      {primaryCategory && (
        <Box
          d="inline-block"
          p={1}
          pl={2}
          pr={2}
          borderRadius={4}
          bg={`${primaryCategory.display.color}.50`}
          borderColor={`${primaryCategory.display.color}.200`}
          borderWidth={2}
          color={`${primaryCategory.display.color}.600`}
          mb={4}
        >
          {primaryCategory.name}
        </Box>
      )}
      <Heading
        as="h2"
        fontSize="6xl"
        lineHeight="1.1"
        font="accent"
        mb={2}
      >
        { isFallback ? <><Skelly /><Skelly /></> : post.title }
      </Heading>
      <Text font="accent" fontSize="lg" bold mb={8}>
        {post?.date ? (
          <>{post?.author?.name} &middot; {moment(post?.date).format('MMMM DD, YYYY')}</>
        ) : (<Skelly width="sm" />)}
      </Text>
      {post ? (
        <Html>{post.content}</Html>
      ) : [...Array(Math.ceil(Math.random() * 5) + 3)].map(() => <SkellyPara />)}
    </Page>
  );
}

const pathsQuery = `{
  blog {
    posts (first: 10000) {
      nodes {
        slug
      }
    }
  }
}`;

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
  const paths = (await apiFetch(pathsQuery)).blog.posts.nodes
    .map((n) => ({ params: { slug: n.slug } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { post } = (await apiFetch(postQuery(slug))).blog;
  return {
    props: {
      post,
    },
  };
}
