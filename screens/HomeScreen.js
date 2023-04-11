import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { getAuth, signOut } from "firebase/auth";
import { doc, addDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { FirebaseError } from 'firebase/app';
import { async } from '@firebase/util';

const auth = getAuth();
const UsuarioCollection = db.collection("UsuarioPerfil");

const HomeScreen = () => {
 const navigation = useNavigation()
  const [CPF, setCPF]= useState('')

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login")
      })
      .   
     console.log(error.message);
  }

  getUsuario = async() => {
    alert("UsuarioPerfil")
    await db.collection("UsuarioPerfil").where('Email', '==', auth.currentUser?.email).get()
    .then(QuerySnapshot => {
      QuerySnapshot.docs.forEach(doc => {
        alert("UsuarioPerfil")
        //  setCPF(doc.CPF);
          console.log(docData);
    })})
    .catch(error => console.log(error.message));

  }

  useEffect( () => {

    UsuarioCollection.onSnapshot(
        querySnapshot => {
            const usuarios = []
            querySnapshot.forEach((doc) => {
                setCPF(doc.CPF)
            })
        }
    )
}, [])

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <View style={styles.inputContainer}>
      <TextInput
          placeholder="CPF"
          value={CPF}
          style={styles.input}
        />
        </View>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
    inputContainer: {
        width: '80%'
      },
})