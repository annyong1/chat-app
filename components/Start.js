import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity, Alert } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [backgroundColor, setBackgroundColor] = useState("");
    const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/Background.png')}
                style={styles.imageBackground}>
                <Text style={styles.title}>Chat It Up!</Text>
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        {/* Name input */}
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={setName}
                            placeholder="Your Name"
                            placeholderTextColor="#757083"
                        />

                        {/* Color selection */}
                        <Text style={styles.colorText}>Choose Background Color:</Text>
                        <View style={styles.colorContainer}>
                            {colors.map((color) => (
                                <TouchableOpacity
                                    key={color}
                                    accessible={true}
                                    accessibilityRole="button"
                                    accessibilityHint="Allows you to choose the background color for your chat screen"
                                    style={[
                                        styles.colorOption,
                                        { backgroundColor: color },
                                        backgroundColor === color && styles.selectedColor,
                                    ]}
                                    onPress={() => setBackgroundColor(color)}
                                />
                            ))}
                        </View>

                        {/* Start chatting button */}
                        <TouchableOpacity
                            accessible={true}
                            accessibilityRole="button"
                            accessibilityHint="Allows you to choose to enter the chat room"
                            title="Start Chatting"
                            onPress={() => navigation.navigate('Chat', { name, backgroundColor })}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
    },
    contentContainer: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "30%", // This pushes the content up, effectively moving the white box down
    },
    inputContainer: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "88%",
        alignItems: "center",
    },
    textInput: {
        width: "100%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#757083",
        marginBottom: 20,
        fontSize: 16,
        fontWeight: "300",
        color: "#171717",
        opacity: 0.5,
    },
    colorText: {
        fontSize: 16,
        fontWeight: "300",
        color: "#171717",
        marginBottom: 10,
    },
    colorContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        marginBottom: 20,
    },
    colorOption: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    selectedColor: {
        borderWidth: 2,
        borderColor: "#757083",
    },
    button: {
        backgroundColor: "#757083",
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    title: {
        flex: 1,
        fontSize: 45,
        fontWeight: '900',
        color: '#FFFFFF',
        margin: 25,
        textAlign: 'center'
    }
});

export default Start;