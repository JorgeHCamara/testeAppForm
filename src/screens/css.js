import { StyleSheet } from "react-native";

export const StylesForm = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#000000',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold'
    },
    label: {
        marginTop: 40,
        color: '#988D8D',
        textAlign: 'left',
        fontSize: 12
    },
    viewText: {
        width: '100%',
        textAlign: 'left'
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
      },
      toggleLabel: {
        marginLeft: 10,
      },
});