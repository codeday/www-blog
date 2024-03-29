import { apiFetch } from '@codeday/topo/utils';
import IndexPage, { query } from '../index';

export default IndexPage;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params: { after } }) {
  const data = await apiFetch(query, { after });
  return {
    props: {
      posts: data?.blog?.posts?.nodes,
      pageInfo: data?.blog?.posts?.pageInfo,
    },
    revalidate: 30,
  }
}
