// import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { AppFooter } from '@/components/Footer';
import { AppHeader } from '@/components/Header';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export function HomePage() {
  // const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <AppHeader />
      <Welcome />
      <AppFooter />
      {/* <ColorSchemeToggle /> */}
    </>
  );
}
