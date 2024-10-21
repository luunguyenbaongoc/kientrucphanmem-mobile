import * as React from 'react';
import { View } from 'react-native';
import { Menu, IconButton, PaperProvider } from 'react-native-paper';

export interface MenuItemProps {
  title?: string;
  onPress?: () => void;
}

export interface MenuProps {
  items?: MenuItemProps[];
  [key: string]: any;
}

export const DropDownMenu = ({ items, ...rests }: MenuProps) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton 
              icon="dots-vertical"
              size={30}
              iconColor="blue"
              onPress={openMenu}
            />
          }
          {...rests}
        >
          {items?.map((item, index) => (
            <Menu.Item 
              key={index}
              onPress={() => {
                closeMenu();
                item.onPress && item.onPress();
              }} 
              title={item.title} 
            />
          ))}
        </Menu>
      </View>
    </PaperProvider>
  );
};
