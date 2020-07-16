import React from 'react';
import PropTypes from 'prop-types';
import { DefaultSeo } from 'next-seo';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Text, { Link } from '@codeday/topo/Atom/Text';
import Button from '@codeday/topo/Atom/Button';
import Header, { SiteLogo, Menu } from '@codeday/topo/Organism/Header';
import Footer, { CustomLinks } from '@codeday/topo/Organism/Footer';
import List, { Item as ListItem } from '@codeday/topo/Atom/List';
import Announcement from '@codeday/topo/Organism/Announcement';
import { CodeDay } from '@codeday/topo/Atom/Logo';
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
            <a href="/">
              <CodeDay />{' '}
              <Text
                as="span"
                d="inline"
                letterSpacing="-2px"
                fontFamily="heading"
                bold
                position="relative"
                top={1}
              >
                CodeDay Blog
              </Text>
            </a>
          </SiteLogo>
          <Menu d={{ base: 'none', md: 'block' }}>
            <Button variant="outline" href="https://www.codeday.org">CodeDay</Button>
            <Button variant="outline" href="https://labs.codeday.org">CodeDay Labs</Button>
            <Button variant="outline" href="https://virtual.codeday.org">Virtual CodeDay</Button>
          </Menu>
        </Header>
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
        <Footer>
          <CustomLinks>
            <List>
              <ListItem>
                <Link href="https://github.com/codeday" target="_blank">Open Source</Link>
              </ListItem>
              <ListItem>
                <Link href="https://codeday.to/discord" target="_blank">Community</Link>
              </ListItem>
            </List>
          </CustomLinks>
        </Footer>
      </Box>
    </>
  );
}
Page.propTypes = {
  children: PropTypes.oneOf([
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
