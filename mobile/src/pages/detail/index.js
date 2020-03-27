import React from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';

import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import logoImg from '../../../src/assets/logo.png';

import { Feather } from '@expo/vector-icons'

import styles from './styles';

import * as MailComposer from 'expo-mail-composer';

import {Linking} from 'react-native';


export default function Detail() {


    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhats() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);

    }

    const navigation = useNavigation();
     const route = useRoute();
    const incident = route.params.incident;
    const message = `Olá ${incident.name} estou entrando em contato pois gostaria de ajudar no caso, ${incident.title} com o valor de R$ ${incident.value}.`;
   


    function navigateBack() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>


            </View>

            <View style={styles.incident}>


                <Text style={styles.incidentProperty, { margintop: 0 }}>
                    ONG:
                </Text>
                <Text style={styles.incidentValue}>
                    {incident.name} de {incident.city}/{incident.uf}
                </Text>

                <Text style={styles.incidentProperty}>
                    Caso:
                </Text>
                <Text style={styles.incidentValue}>
                    {incident.title}
                </Text>
                <Text style={styles.incidentProperty}>
                    Valor:
                </Text>
                <Text style={styles.incidentValue}>
                {Intl.NumberFormat('pt-BR',{
                        style: 'currency', 
                        currency: 'BRL'
                        }).format(incident.value)}
                </Text>

            </View>


            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>
                    Salve o dia
                </Text>
                <Text style={styles.heroTitle}>
                    Seja o herói desse caso.
                </Text>

                <Text style={styles.heroDescription}>
                    Entre em contato
                </Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhats}>
                        <Text style={styles.actionText}>
                            WhatsApp
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>
                            E-mail
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    );
}