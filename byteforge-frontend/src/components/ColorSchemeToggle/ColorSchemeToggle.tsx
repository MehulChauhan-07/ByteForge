// import { Button, Group, useMantineColorScheme } from '@mantine/core';

// export function ColorSchemeToggle() {
//   const { setColorScheme } = useMantineColorScheme();

//   return (
//     <Group justify="center" mt="xl">
//       <Button onClick={() => setColorScheme('light')}>Light</Button>
//       <Button onClick={() => setColorScheme('dark')}>Dark</Button>
//       <Button onClick={() => setColorScheme('auto')}>Auto</Button>
//     </Group>
//   );
// }

import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';
import { ActionIcon, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import classes from '../style/Toggle.module.css';

export const ColorSchemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="xl"
      aria-label="Toggle color scheme"
    >
      <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
      <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
    </ActionIcon>
  );
};
