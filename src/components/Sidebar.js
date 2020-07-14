import React from 'react';
import useSwr from 'swr';
import Announcement from '@codeday/topo/Organism/Announcement';
import Text, { Heading, Link } from '@codeday/topo/Atom/Text';
import { Grid } from '@codeday/topo/Atom/Box';
import Image from '@codeday/topo/Atom/Image';
import IconBox, { HeaderIcon, HeaderText, Body } from '@codeday/topo/Molecule/IconBox';
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
          url(transform:{width:200})
        }
        name
        link
      }
    }
  }
}`;

export default function Sidebar() {
  const { data } = useSwr(programsQuery, apiFetch);
  const mission = useString('common.mission');

  return (
    <>
      <Text textAlign="center" fontStyle="italic" color="gray.800">{mission}</Text>

      {data?.cms?.globalSponsors?.items && data.cms.globalSponsors.items.length > 0 && (
        <>
          <Heading as="h3" fontSize="lg" mt={8} mb={4}>Our Sponsors</Heading>
          <Grid templateColumns="1fr 1fr 1fr" alignItems="center" columnGap={4} rowGap={8} mb={16}>
            {data.cms.globalSponsors.items.map((sponsor) => (
              <Link key={sponsor.sys.id} d="inline" href={sponsor.link} target="_blank">
                <Image d="inline" src={sponsor.logo.url} alt={sponsor.name} />
              </Link>
            ))}
          </Grid>
        </>
      )}

      <Announcement box />

      {data?.cms?.programs?.items && data.cms.programs.items.length > 0 && (
        <>
          <Heading as="h3" fontSize="lg" mt={8}>Our Programs</Heading>
          {data.cms.programs.items.map((item) => (
            <IconBox as="a" target="_blank" d="block" href={item.url} key={item.sys.id} mt={4}>
              <HeaderIcon><Image height={12} src={item.logo.url} /></HeaderIcon>
              <HeaderText>{item.name}</HeaderText>
              <Body>{item.shortDescription}</Body>
            </IconBox>
          ))}
        </>
      )}
    </>
  );
}
