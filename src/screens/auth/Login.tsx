import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import TextInputComponent from '../../components/TextInputComponent';
import Logo from '../../assets/svg/logo.svg'
import { verticalScale } from '../../utils/Matrics';
import firebase from '@react-native-firebase/firestore';
import { connect } from 'react-redux';
import { getAuthSuccess } from '../../redux/slices/UserSlice';
import Loader from '../../components/Loader';
import LoginStyle from '../../styles/LoginStyle';

const Login = (props: any) => {
  const [visible, setVisible] = useState(false);

  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = data => {
    console.log(data);
    setVisible(true);
    firebase().collection("users").where("email", "==", data.email).get().then(res => {
      console.log(res, "res");
      if (res.docs !== []) {
        console.log(JSON.stringify(res.docs[0].data()));
        props.getAuthSuccess({
          name: res.docs[0].data().name,
          email: res.docs[0].data().email,
          userId: res.docs[0].data().userId
        })
      }
      setVisible(false);
    }).catch(error => {
      setVisible(false);
      console.log(error, "login-error");
      Alert.alert("User not found")

    })
  };

  return (
    <View style={LoginStyle.container}>
      <View style={{ alignSelf: 'center', marginBottom: verticalScale(50) }}>
        <Logo height={100} width={100} />
      </View>

      <Text style={LoginStyle.h1Style}>Login</Text>
      <Text style={LoginStyle.label}>Email</Text>
      <Controller
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            message: 'Enter a valid email'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputComponent
            inputStyle={errors.email && LoginStyle.errorInput}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        )}
        name="email"
      />
      {errors.email && <Text style={LoginStyle.errorText}>{errors.email.message}</Text>}

      <Text style={LoginStyle.label}>Password</Text>
      <Controller
        control={control}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInputComponent
            inputStyle={errors.password && LoginStyle.errorInput}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            placeholder="Enter your password"
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && <Text style={LoginStyle.errorText}>{errors.password.message}</Text>}

      <View style={{ marginTop: 15 }}>
        <Button title="Login" onPress={handleSubmit(onSubmit)} />
      </View>
      <Text style={LoginStyle.orStyle}>or</Text>
      <TouchableOpacity onPress={() => props.navigation.navigate('Signup')}>
        <Text style={LoginStyle.signupTextStyle}>SignUp</Text>
      </TouchableOpacity>

      <Loader visible={visible} />
    </View>
  )
}

const mapStateToProps = (state: any) => {

  return {
    loginData: state.user.loginData

  };
};

const mapDispatchToProps = (dispatch: any) => ({
  getAuthSuccess: (data: any) => dispatch(getAuthSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);