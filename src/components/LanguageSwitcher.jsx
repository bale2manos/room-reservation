import { Button, Menu, MenuButton, MenuList, MenuItem, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="ghost"
        color="white"
        _hover={{ bg: 'whiteAlpha.200' }}
        _active={{ bg: 'whiteAlpha.300' }}
      >
        {i18n.language === 'es' ? 'ES' : 'EN'}
      </MenuButton>
      <MenuList>
        <MenuItem 
          onClick={() => changeLanguage('es')}
          color="gray.700"
        >
          <Text>Español</Text>
        </MenuItem>
        <MenuItem 
          onClick={() => changeLanguage('en')}
          color="gray.700"
        >
          <Text>English</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
} 