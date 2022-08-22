import React from 'react';
import { AllHtmlEntities as entities } from 'html-entities';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import { apiFetch } from '@codeday/topo/utils';
import Page from '../components/Page';

export default function Home({ posts, pageInfo }) {
  return (
    <Page slug="/" title="CodeDay Blog">
        {posts?.map((post) => (
          <Link key={post.slug} d="block" href={`/${post.slug}`} style={{ textDecoration: 'none' }} mb={16}>
            <Grid templateColumns={{ base: "1fr", md: "1fr 4fr" }} gap={4}>
              <Box
                width={{ base: 32, md: "100%" }}
                height={32}
                backgroundColor="gray.100"
                backgroundImage={`url(${post.featuredImage?.node?.sourceUrl})`}
                style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
              />
              <Box>
                <Heading as="h3" fontSize="xl">{entities.decode(post.title)}</Heading>
                <Box dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              </Box>
            </Grid>
          </Link>
        ))}
        {pageInfo.hasNextPage && (
          <Link href={`/after/${pageInfo.endCursor}`}>Next Page</Link>
        )}
    </Page>
  );
}

export const query = `query BlogPosts ($after: String, $where: BlogRootQueryToPostConnectionWhereArgs) {
  blog {
    posts (first: 10, after: $after, where: $where) {
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
          }
        }
      }
    }
  }
}`;

export async function getStaticProps() {
  const data = await apiFetch(query);
  return {
    props: {
      posts: data?.blog?.posts?.nodes,
      pageInfo: data?.blog?.posts?.pageInfo
    },
    revalidate: 30,
  }
}
