import React from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, Alert, ToastAndroid } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import TextInputComponent from '../../components/TextInputComponent';
import firebase from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Logo from '../../assets/svg/logo.svg'
import { verticalScale } from '../../utils/Matrics';
import SignupStyle from '../../styles/SignupStyle';

const Signup = (props: any) => {
  const { control, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    }
  });

  const signUpHandle = async (data: any) => {

    try {
      const emailExists = await checkIfEmailExists(data.email);

      if (emailExists) {
        Alert.alert('Email is already registered');
        return;
      }

      const userId: any = uuid.v4();
      await firebase().collection("users").doc(userId).set({
        name: data.name,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        userId: userId,
      });

      ToastAndroid.showWithGravity('User Created', 10, 0);
      props.navigation.goBack();
    } catch (error) {
      console.log(error, "error");
    }
  };

  const checkIfEmailExists = async (email: string) => {
    try {
      const userSnapshot = await firebase()
        .collection('users')
        .where('email', '==', email)
        .get();

      return !userSnapshot.empty;
    } catch (error) {
      console.error('Error checking email: ', error);
      throw error;
    }
  };

  const onSubmit = (data: any) => {
    signUpHandle(data);
  };

  const validateMobile = (value: any) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(value) || 'Mobile number must be 10 digits';
  };

  const validatePasswordMatch = (value) => {
    const password = getValues('password');
    return value === password || 'Passwords do not match';
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={SignupStyle.container}>
        <View style={{ alignSelf: 'center', marginBottom: verticalScale(50) }}>
          <Logo height={100} width={100} />
        </View>
        <Text style={SignupStyle.h1Style}>Sign Up</Text>
        <ScrollView >

          <Text style={SignupStyle.label}>Name</Text>
          <Controller
            control={control}
            rules={{
              required: 'Name is required'
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputComponent
                inputStyle={errors.name && SignupStyle.errorInput}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Enter your name"
              />
            )}
            name="name"
          />
          {errors.name && <Text style={SignupStyle.errorText}>{errors.name.message}</Text>}

          <Text style={SignupStyle.label}>Email</Text>
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
                inputStyle={errors.email && SignupStyle.errorInput}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            )}
            name="email"
          />
          {errors.email && <Text style={SignupStyle.errorText}>{errors.email.message}</Text>}

          <Text style={SignupStyle.label}>Mobile Number</Text>
          <Controller
            control={control}
            rules={{
              required: 'Mobile number is required',
              validate: validateMobile
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputComponent
                inputStyle={errors.mobile && SignupStyle.errorInput}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Enter your mobile number"
                keyboardType="numeric"
              />
            )}
            name="mobile"
          />
          {errors.mobile && <Text style={SignupStyle.errorText}>{errors.mobile.message}</Text>}

          <Text style={SignupStyle.label}>Password</Text>
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
                inputStyle={errors.password && SignupStyle.errorInput}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Enter your password"
                secureTextEntry
              />
            )}
            name="password"
          />
          {errors.password && <Text style={SignupStyle.errorText}>{errors.password.message}</Text>}

          <Text style={SignupStyle.label}>Confirm Password</Text>
          <Controller
            control={control}
            rules={{
              required: 'Confirm password is required',
              validate: validatePasswordMatch
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputComponent
                inputStyle={errors.confirmPassword && SignupStyle.errorInput}
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                placeholder="Confirm your password"
                secureTextEntry
              />
            )}
            name="confirmPassword"
          />
          {errors.confirmPassword && <Text style={SignupStyle.errorText}>{errors.confirmPassword.message}</Text>}
        </ScrollView>
        <View style={{ marginTop: 15 }}>
          <Button title="Sign up" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>

    </SafeAreaView>
  );
};


export default Signup;
