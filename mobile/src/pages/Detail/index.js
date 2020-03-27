import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';

export default function Detail(){

  const navigation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;

  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
    .format(incident.value)}.`;

  function navigateBack(){
    navigation.goBack();
  }

  function sendEmail(){
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message, 
    })
  }

  function sendWhatsApp(){
    Linking.openURL(`whatsapp://send?phone=558893468976&text=${message}`);
  }

  return (
    <View style = {styles.container}>

      <View style = {styles.header}>
        <Image source = {logoImg}/>
        <TouchableOpacity onPress = {navigateBack}>
          <Feather name = 'arrow-left' size = {28} color = '#e02041'/>
        </TouchableOpacity>
      </View>

      <View style = {styles.incident}>
        <Text style = {[styles.incidentProperty, {marginTop: 0}]}>Ong</Text>
        <Text style = {styles.incidentValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style = {styles.incidentProperty}>Caso</Text>
        <Text style = {styles.incidentValue}>{incident.title}</Text>

        <Text style = {styles.incidentProperty}>Valor</Text>
        <Text style = {styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
            .format(incident.value)}
        </Text>
      </View>

      <View style = {styles.contactBox}>
        <Text style = {styles.contactBoxTitle}>Salve o dia!</Text>
        <Text style = {styles.contactBoxTitle}>Seja o herói deste caso.</Text>

        <Text style = {styles.contactBoxDescription}>Entre em contato:</Text>

        <View style = {styles.contactButtonsBox}>

          <TouchableOpacity onPress = {sendWhatsApp} style = {styles.contactButton}>
            <Text style = {styles.contactButtonText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {sendEmail} style = {styles.contactButton}>
            <Text style = {styles.contactButtonText}>E-mail</Text>
          </TouchableOpacity>

        </View>
      </View>
      
    </View>//Fim do container
  );
};