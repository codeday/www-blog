import React from 'react';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Image from '@codeday/topo/Atom/Image';
import Box from '@codeday/topo/Atom/Box';
import Content from '@codeday/topo/Molecule/Content';
import Page from './Page';

export default function Home() {
  const hero = (
    <Content>
      <Image
        alt=""
        src="https://img.codeday.org/w=1024;h=300;fit=crop;crop=faces,edges/v/c/vcra9i886chuothctokmqr965fkva9pzaik9wqfe2skemipbwb8n17qhgi81f2zbn8.jpg"
      />
    </Content>
  );
  return (
    <Page slug="/" title="CodeDay Blog" hero={hero}>
      <Text as="h2" fontSize="5xl" bold mt={4}>We couldn&apos;t find that one.</Text>
      <Box mt={4} mb={16}>
        <Text>
          If you think you should be able to access this, <Link href="mailto:team@codeday.org">contact us.</Link>
        </Text>
      </Box>
    </Page>
  );
}
