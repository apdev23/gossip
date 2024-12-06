import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import UsersStyle from '../../styles/UsersStyle';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';

const Users = (props: any) => {
    const [userList, setUserList] = useState([]);
    const state = useSelector((state: any) => state.user.loginData);

    console.log(state, "kkdkk");

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        let tempData = [];
        firestore().collection("users").where("email", "!=", state?.email).get().then(res => {
            console.log(JSON.stringify(res.docs[0].data()));
            if (res.docs != []) {
                res?.docs?.map(item => {
                    tempData.push(item.data())
                })
            }
            setUserList(tempData);
        })
    }
    // console.log(userList, "userList----");

    return (
        <SafeAreaView style={UsersStyle.safeAreaViewStyle}>
            <FlatList
                data={userList}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate('Chat', { data: item, id: state?.userId })} style={UsersStyle.userBoxStyle}>
                            <Image source={require('../../assets/png/user.png')} style={{ width: 20, height: 20 }} />
                            <Text style={UsersStyle.userNameStyle}>{item?.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default Users;