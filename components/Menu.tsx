import * as React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Menu,
  IconButton,
  PaperProvider,
  Button,
  Divider,
  Provider,
} from "react-native-paper";

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
    <View style={{ zIndex: 100 }}>
      <Provider>
        <View>
          <Menu
            style={{
              top: 0,
              left: -130,
              position: "absolute",
              zIndex: 100,
              width: 150,
              justifyContent: "flex-end",
              // backgroundColor: "#222",
            }}
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
      </Provider>
    </View>
  );
};
