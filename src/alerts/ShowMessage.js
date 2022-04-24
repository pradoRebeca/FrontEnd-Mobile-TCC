import  React, {useState} from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";

const ShowMessage = ({functionVisible, text}) => {
  const [visibleMessage, setVisibleMessage] = useState(false);

  const showDialog = () => setVisibleMessage(true);

  const hideDialog = () => {
    setVisibleMessage(false)
    functionVisible(visibleMessage)
  };

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={visibleMessage} onDismiss={hideDialog} >
            <Dialog.Content>
              <Paragraph>{text}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={() => console.log('Ok')}>Ok</Button>
        </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default ShowMessage;
