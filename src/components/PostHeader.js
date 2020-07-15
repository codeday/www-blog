import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Skelly from '@codeday/topo/Atom/Skelly';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Box from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Image from '@codeday/topo/Atom/Image';

export default function PostHeader({ isFallback, post }) {
  const primaryCategory = post?.categories?.nodes[0];

  return (
    <>
    {post?.featuredImage && (
      <Content wide>
        <Box height="xs" mt={-8} mb={4} borderRadius={4} style={{ overflow: 'hidden' }}>
          <Image
            style={{ objectFit: 'cover', objectPosition: '50% 50%'}}
            width="100%"
            height="100%"
            src={post.featuredImage.sourceUrl}
          />
        </Box>
      </Content>
    )}
      <Content>
        {isFallback && (<Skelly height="xs" />)}
        {isFallback && (<Skelly width="2xs" height={8} />)}
        {primaryCategory && (
          <Box fontWeight="bold">
            <Text as="span" color={`${primaryCategory.display.color}.700`}>{primaryCategory?.name}</Text>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            {moment(post?.date).format('MMMM DD, YYYY')}
          </Box>
        )}
        <Heading
          as="h2"
          fontSize="6xl"
          lineHeight="1.1"
          fontFamily="accent"
          mt={-2}
        >
          { isFallback ? <><Skelly /><Skelly /></> : post.title }
        </Heading>
        <Text font="accent" fontSize="lg" bold mb={8}>
          {isFallback ? (<Skelly width="sm" />) : (
            <>{post?.author?.name}</>
          )}
        </Text>
      </Content>
    </>
  )
};
PostHeader.propTypes = {
  post: PropTypes.object,
  isFallback: PropTypes.bool,
};
PostHeader.defaultProps = {
  post: {},
  isFallback: false,
};
