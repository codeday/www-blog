import React from 'react';
import PropTypes from 'prop-types';
import { DefaultSeo } from 'next-seo';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Link } from '@codeday/topo/Atom/Text';
import Button from '@codeday/topo/Atom/Button';
import Header, { SiteLogo, Menu } from '@codeday/topo/Organism/Header';
import Main from '@codeday/topo/Organism/Main';
import Footer, { CustomLinks } from '@codeday/topo/Organism/Footer';
import List, { Item as ListItem } from '@codeday/topo/Atom/List';
import Announcement from '@codeday/topo/Organism/Announcement';
import { CodeDay } from '@codeday/topo/Atom/Logo';
import UiArrowRight from '@codeday/topocons/Icon/UiArrowRight';
import Sidebar from './Sidebar';

const DOMAIN = 'https://blog.codeday.org';

export default function Page({
  children, title, darkHeader, slug, hero,
}) {
  return (
    <>
      <DefaultSeo
        title={title}
        description="Tech and education insights from the CodeDay team."
        canonical={`${DOMAIN}${slug}`}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          site_name: 'blog',
          url: `${DOMAIN}${slug}`,
        }}
        twitter={{
          handle: '@codeday',
          site: '@codeday',
          cardType: 'summary_large_image',
        }}
      />
      <Announcement />
      <Box position="relative">
        <Header
          darkBackground={darkHeader}
          gradAmount={darkHeader && 'lg'}
          underscore={!hero}
          position="relative"
          zIndex={1000}
        >
          <SiteLogo>
            <a href="https://www.codeday.org/">
              <CodeDay withText />
            </a>
            <a href="/">
              <Text
                as="span"
                d="inline"
                letterSpacing="-2px"
                fontFamily="heading"
                position="relative"
                top={1}
                ml={1}
                bold
              >
                Blog
              </Text>
            </a>
          </SiteLogo>
          <Menu d={{ base: 'none', md: 'block' }}>
            <Button
              variantColor="red"
              as="a"
              href="https://www.codeday.org"
              rel="noopener"
            >
              Main Site &nbsp;<UiArrowRight style={{ position: 'relative', top: '-1px', fill: 'currentColor' }} />
            </Button>
          </Menu>
        </Header>
        <Main>
          {hero}
          <Content mb={16}>
            <Grid templateColumns={{ base: '1fr', md: 'minmax(0, 9fr) 4fr' }} gap={24}>
              <Box>
                {children}
              </Box>
              <Box d={{ base: 'none', md: 'block' }}>
                <Sidebar />
              </Box>
            </Grid>
          </Content>
        </Main>
        <Footer>
          <CustomLinks>
            <List>
              <ListItem>
                <Link href="https://github.com/codeday" target="_blank" rel="noopener">Open Source</Link>
              </ListItem>
              <ListItem>
                <Link href="https://codeday.to/discord" target="_blank" rel="noopener">Community</Link>
              </ListItem>
            </List>
          </CustomLinks>
        </Footer>
      </Box>
    </>
  );
}
Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  hero: PropTypes.element,
  title: PropTypes.string.isRequired,
  darkHeader: PropTypes.bool,
  slug: PropTypes.string.isRequired,
};
Page.defaultProps = {
  darkHeader: false,
  hero: null,
};
