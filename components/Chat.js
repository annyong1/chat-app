import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {

    const [messages, setMessages] = useState([]);

    const { name, backgroundColor } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name, color: backgroundColor });
        setMessages([
            {
                _id: 1,
                text: 'Hello developer ',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ])
    }, []);

    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
            <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
                <GiftedChat
                    messages={messages}
                    onSend={onSend}
                    user={{
                        _id: 1,
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