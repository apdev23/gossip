import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';

const Chat = (props: any) => {
  const { data, id } = props.route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let subscriber = null;

    if (data && id) {
      subscriber = firestore()
        .collection("chats")
        .doc(id + data?.userId)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .onSnapshot(querySnapshot => {
          const allMessages = querySnapshot.docs.map(item => {
            const messageData = item.data();
            return {
              ...messageData,
              createdAt: messageData.createdAt && messageData.createdAt.toDate ? messageData.createdAt.toDate() : new Date(),
            };
          });
          setMessages(allMessages);
        });
    }

    return () => subscriber && subscriber();
  }, [data, id]);

  const onSend = useCallback((messages = []) => {
    const msg: any = messages[0];
    const myMsg = {
      ...msg,
      sendBy: id,
      sendTo: data?.userId,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, myMsg),
    );
    firestore().collection("chats").doc('' + id + data?.userId).collection("messages").add(myMsg);
    firestore().collection("chats").doc('' + data?.userId + id).collection("messages").add(myMsg);
  }, [data, id]);

  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#fff',
          borderTopColor: '#e0e0e0',
          borderTopWidth: 1,
        }}
        textInputStyle={{
          color: '#000',
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {id ? (
        <GiftedChat
          messages={messages}
          onSend={(messages: any) => onSend(messages)}
          user={{
            _id: id,
          }}
          renderInputToolbar={renderInputToolbar}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default Chat;
