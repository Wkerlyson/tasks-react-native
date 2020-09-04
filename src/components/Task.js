import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome/'
import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import Swipeable from 'react-native-gesture-handler/Swipeable'


export default props => {
    const doneOrNoteStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const fomarttedDate = moment(date).local('pt-br').format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}>
                <Icon name='trash' size={20} color='#FFF' />
            </TouchableOpacity>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent}>
            <View style={styles.constainer}>
                <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNoteStyle]}>{props.desc}</Text>
                    <Text style={styles.estimateAt}>{fomarttedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView(doneAt) {

    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20} color='#FFF'></Icon>
            </View>
        )
    } else {
        return (
            <View>
                <Text style={styles.pending}></Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    constainer: {
        flexDirection: "row",
        backgroundColor: '#FFF',
        alignItems: "center",
        paddingVertical: 15,
        marginVertical: 5
    },
    checkContainer: {
        width: '20%',
        alignItems: "center",
        justifyContent: "center"
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#bdbdbd'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        alignItems: "center",
        justifyContent: "center"
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 16,
    },
    estimateAt: {
        color: '#bdbdbd',
        fontFamily: commonStyles.fontFamily,
        fontSize: 12
    },
    right: {
        backgroundColor: '#B13B44',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 5
    }
})