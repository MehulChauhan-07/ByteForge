import {IconBrandStackoverflow } from '@tabler/icons-react';
import { ActionIcon, Container, Group } from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import { Logo, GithubIcon } from '@/components/icons';
import classes from './style/FooterSocial.module.css';

export function AppFooter() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Logo size={45} />
        <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandStackoverflow size={26} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <GithubIcon size={26} stroke="1.5" />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}