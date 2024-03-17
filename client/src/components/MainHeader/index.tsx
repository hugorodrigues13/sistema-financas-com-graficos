import React, { useState, useEffect, useContext } from 'react';
import { Container, Profile, Welcome, UserName } from './styles';
import { Toggle } from '../Toggle';
import { AuthContext } from '@/contexts/AuthContext';
import { emojis } from '@/utils/emojis';

export function MainHeader() {
  const { toggleTheme, theme } = useContext(AuthContext);
  const [randomEmoji, setRandomEmoji] = useState<string | null>(null);

  const handleChangeTheme = () => {
    toggleTheme();
  };

  useEffect(() => {
    (async () => {
      const index = Math.floor(Math.random() * emojis.length);
      const selectedEmoji = emojis[index];
      setRandomEmoji(selectedEmoji);
    })();
  }, []);

  return (
    <Container>
      <Toggle
        labelLeft="Light"
        labelRight="Dark"
        checked={theme.title === 'dark'}
        onChange={handleChangeTheme}
      />

      <Profile>
        <Welcome>Olá, {randomEmoji}</Welcome>
        <UserName>Hugo Rodrigues</UserName>
      </Profile>
    </Container>
  );
}