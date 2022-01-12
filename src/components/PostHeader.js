import React from 'react';
import PropTypes from 'prop-types';
import { AllHtmlEntities as entities } from 'html-entities';
import Skelly from '@codeday/topo/Atom/Skelly';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Box from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Image from '@codeday/topo/Atom/Image';

export default function PostHeader({ isFallback, post }) {
  const primaryCategory = post?.categories?.nodes[0];

  return (
    <>
    {isFallback && (<Content wide><Skelly height={{ base: "2xs", sm: "xs", md: "sm", lg: "lg" }} /></Content>)}
    {post?.featuredImage?.node && (
      <Content wide>
        <Box
          height={{ base: "2xs", sm: "xs", md: "sm", lg: "lg"}}
          mt={-8}
          mb={4}
          borderRadius={4}
          backgroundColor="gray.100"
          backgroundImage={`url(${post.featuredImage.node.sourceUrl})`}
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
          { isFallback ? <><Skelly /><Skelly /></> : entities.decode(post.title) }
        </Heading>
        <Box mb={8} mt={4}>
          {isFallback ? (<Skelly width="sm" />) : (
            <>
              <Image
                d="inline"
                rounded="full"
                src={post?.author?.picture}
                w="1em"
                h="1em"
                mr={1}
                position="relative"
                top="-2px"
                alt=""
              />
              <Link
                font="accent"
                fontSize="lg"
                fontWeight="bold"
                href={`mailto:${post?.author?.username}@codeday.org`}
              >
                {post?.author?.name}{

              }</Link>,{' '}
              {post?.author?.title || 'Community Member'}
            </>
          )}
        </Box>
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
