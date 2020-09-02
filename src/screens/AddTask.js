import React, { Component } from 'react'
import { View, Modal, StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity, Platform } from 'react-native'
import commonStyles from '../commonStyles'
import { TextInput } from 'react-native-gesture-handler'

import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends Component {
    state = {
        ...initialState
    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => date ? this.setState({ date, showDatePicker: false }) : this.setState({ showDatePicker: false })}
            mode='date' />

        const dateString = moment(this.state.date).format('ddd, D [de] MMMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker
    }

    render() {
        return (
            <Modal transparent visible={this.props.isVisible}
                onRequestClose={this.props.onCancel} animationType='slide'>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <TextInput style={styles.input}
                        placeholder='Informe a descrição'
                        value={this.state.desc}
                        onChangeText={desc => this.setState({ desc })} />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.buttonCancel}>CANCELAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.buttonSave}>SALVAR</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    buttonSave: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    buttonCancel: {
        margin: 20,
        marginRight: 10,
        color: '#bdbdbd'
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        paddingLeft: 10,
        margin: 10,
        marginTop: 20
    },
    date: {
        backgroundColor: '#f5f5f5',
        fontFamily: commonStyles.fontFamily,
        borderRadius: 5,
        paddingLeft: 10,
        paddingVertical: 15,
        margin: 10,
        marginTop: 5
    }
})