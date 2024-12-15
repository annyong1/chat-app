import { collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ db, route, navigation }) => {
    const { name, background, userID } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name, color: background });
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis
                        ())
                })
            })
            setMessages(newMessages);
        })
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }

    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />

    }

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: background, flex: 1 }}>
                <GiftedChat
                    messages={messages}
                    onSend={(messages) => onSend(messages)}
                    user={{
                        _id: userID,
                        name: name,
                    }}
                    renderBubble={renderBubble}
                    alwaysShowSend={true}
                    textInputStyle={{ backgroundColor: "#FFF" }}
                    keyboardVerticalOffset={100}
                />
                {Platform.OS === "android" || Platform.OS === 'ios' ? (
                    <KeyboardAvoidingView behavior="height" />
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Chat;