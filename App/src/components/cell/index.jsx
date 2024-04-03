import styles from "./styles";
import {Button, Text, View} from "react-native";
import React from "react";

export default function Cell ({ text, handleEditar, handleRemover, item }) {
    return (
        <View style={styles.item}>
            <Text>{text}</Text>
            <Button title="🖊" onPress={() => handleEditar(item)} />
            <Button title="❌" onPress={() => handleRemover(item.id)} />
        </View>
    )
}