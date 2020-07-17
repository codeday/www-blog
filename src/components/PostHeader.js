import React from 'react';
import PropTypes from 'prop-types';
import Skelly from '@codeday/topo/Atom/Skelly';
import Text, { Heading } from '@codeday/topo/Atom/Text';
import Box from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Image from '@codeday/topo/Atom/Image';

export default function PostHeader({ isFallback, post }) {
  const primaryCategory = post?.categories?.nodes[0];

  return (
    <>
    {isFallback && (<Content wide><Skelly height={{ base: "2xs", sm: "xs", md: "sm", lg: "lg" }} /></Content>)}
    {post?.featuredImage && (
      <Content wide>
        <Box
          height={{ base: "2xs", sm: "xs", md: "sm", lg: "lg"}}
          mt={-8}
          mb={4}
          borderRadius={4}
          backgroundColor="gray.100"
          backgroundImage={`url(${post.featuredImage.sourceUrl})`}
          style={{ backgroundSize: 'cover', backgroundPosition: '50% 50%' }}
         />
      </Content>
    )}
      <Content>
        {isFallback && (<Skelly width="2xs" height={8} />)}
        {primaryCategory && (
          <Box fontWeight="bold">
            <Text as="span" color={`${primaryCategory.display.color}.800`}>{primaryCategory?.name}</Text>
            &nbsp;&nbsp;&middot;&nbsp;&nbsp;
            {post.date}
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
