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

        <ion-grid>
          <ion-row v-for="jogo in lista" :key="jogo.id">
            <ion-col>
              {{ jogo.nome }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonCol, IonRow } from '@ionic/vue';
import { defineComponent } from 'vue';
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore"; 

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
    IonRow
  },
  data() {
    return {
      lista: []
    }
  },
    created: async function() {
      const querySnapshot = await getDocs(collection(db, "jogos"));
      querySnapshot.forEach((doc) => {
        const jogo = { id: doc.id, ...doc.data() };
        this.lista.push(jogo);
      });
    }
  });
</script>

<style scoped>
#container {
  text-align: center;
  margin: 20px;
}


</style>