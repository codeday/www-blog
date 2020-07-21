import React from 'react';
import useSwr from 'swr';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import Box, { Grid } from '@codeday/topo/Atom/Box';
import Image from '@codeday/topo/Atom/Image';
import { apiFetch, useString } from '@codeday/topo/utils';

const programsQuery = `{
  cms {
    programs(where: { type: "primary" }, order: [sys_firstPublishedAt_ASC] ) {
      items {
        sys {
          id
        }
        logo {
          url
        }
        name
        shortDescription
        url
      }
    }

    globalSponsors(order:[type_ASC, sys_firstPublishedAt_ASC]) {
      items {
        sys {
          id
        }
        logo {
          url(transform:{width:82})
        }
        name
        link
      }
    }
  }
}`;

export default function Sidebar() {
  const { data } = useSwr(programsQuery, apiFetch, { revalidateOnFocus: false, revalidateOnReconnect: false });
  const mission = useString('common.mission');

  return (
    <>
      <Text textAlign="center" fontStyle="italic" color="gray.800" mb={16}>
        {mission}<br /><br />
        Follow us on{' '}
        <Link href="https://www.linkedin.com/company/codeday-org/" color="red.600" target="_blank">LinkedIn</Link>
        {' '}or <Link href="https://twitter.com/codeday" target="_blank" color="red.600">Twitter</Link>
      </Text>

      {data?.cms?.programs?.items && data.cms.programs.items.length > 0 && (
        <Box mb={16}>
          <Heading as="h3" fontSize="lg" mb={4} color="gray.800">Our Programs</Heading>
          {data.cms.programs.items.map((item) => (
              <Box as="a" d="inline-block" href={item.url} mb={4} target="_blank" rel="noopener">
                <Text as="div" textDecoration="underline" bold color="red.600">{item.name}</Text>
                <Text as="div" color="gray.800">{item.shortDescription}</Text>
              </Box>
          ))}
        </Box>
      )}

      {data?.cms?.globalSponsors?.items && data.cms.globalSponsors.items.length > 0 && (
        <Box mb={16}>
          <Heading as="h3" fontSize="lg" mb={4} color="gray.800">With Worldwide Support From</Heading>
          <Grid templateColumns="1fr 1fr 1fr" alignItems="center" columnGap={4} rowGap={8} mb={16}>
            {data.cms.globalSponsors.items.map((sponsor) => (
              <Link key={sponsor.sys.id} d="inline" href={sponsor.link} target="_blank" rel="noopener">
                <Image d="inline" src={sponsor.logo.url} style={{ filter: "grayscale(100%)", opacity: 0.5 }} alt={sponsor.name} />
              </Link>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
