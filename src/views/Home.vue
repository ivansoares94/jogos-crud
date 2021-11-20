<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Jogos</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Jogos</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <div>
          <ion-input type="text" placeholder="Nome do jogo" v-model="jogo.nome"></ion-input>
          <ion-input type="text" placeholder="Ano lançamento" v-model="jogo.ano"></ion-input>
          <ion-input type="text" placeholder="Gênero" v-model="jogo.genero"></ion-input>
          <ion-input type="text" placeholder="Multijogador" v-model="jogo.multijogador"></ion-input>
          <ion-button @click="salvar"> Salvar </ion-button>
        </div>
 
        <ion-grid>
          <ion-row class="ion-align-items-center" v-for="jogo in lista" :key="jogo.id">
            <ion-col> {{ jogo.nome }} </ion-col>
            <ion-col size="2"><ion-button color="warning">E</ion-button></ion-col>
            <ion-col size="2"><ion-button color="danger" @click="apagar(jogo.id)">X</ion-button></ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, IonButton, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import { db } from '../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore"; 

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
    IonInput
  },
  data() {
    return {
      jogo: {},
      lista: []
    }
  },
    created: async function() {
      this.atualizar();
    },
    methods: {
      atualizar: async function() {
        this.lista = [];
        const querySnapshot = await getDocs(collection(db, "jogos"));
        querySnapshot.forEach((doc) => {
          const jogo = { id: doc.id, ...doc.data() };
          this.lista.push(jogo);
      });
      },
      salvar: async function() {
        try {
          const docRef = await addDoc(collection(db, "jogos"), this.jogo);
          console.log("Document written with ID: ", docRef.id);
          this.atualizar();
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      },
      apagar: async function(id) {
        await deleteDoc(doc(db, 'jogos', id));
        this.atualizar();
      }
    }
  });
</script>

<style scoped>
#container {
  text-align: center;
  margin: 20px;
}
ion-input {
  border: 1px solid lightgray;
  border-radius: 5px;
}

</style>