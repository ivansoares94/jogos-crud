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
          <br>
          <ion-input type="text" placeholder="Ano lançamento" v-model="jogo.ano"></ion-input>
          <br>
      
          <ion-button @click="salvar"> Salvar </ion-button>
          <br>
        </div>
    
        <ion-list>
          <ion-item v-for="jogo in lista" :key="jogo.id">
            <ion-label>Nome: {{ jogo.nome }}</ion-label>
                <ion-label>Ano: {{ jogo.ano }}</ion-label>
                
             <ion-col size="2"><ion-button color="warning" @click="editar(jogo.id)">Editar</ion-button></ion-col>
            <ion-col size="2"><ion-button color="danger" @click="apagar(jogo.id)">Excluir</ion-button></ion-col>
          </ion-item>
        </ion-list>
 
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCol, IonButton, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import { db } from '../firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"; 

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCol,
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
          console.log(this.lista)
      });
      },
      salvar: async function() {
        try {
         if(this.jogo.nome != null || ''){
            if (this.jogo.id) {
            const jogoSemId = this.jogo;
            delete(jogoSemId.id);
            await setDoc(doc(db, 'jogos', this.jogo.id), this.jogo);
             this.jogo = {};
          }
          else {
            const docRef = await addDoc(collection(db, "jogos"), this.jogo);
            console.log("Document written with ID: ", docRef.id);
             this.jogo = {};
          }
          this.atualizar();
         }else{
           window.alert('Preencha o nome do jogo!')
         }
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      },
      apagar: async function(id) {
        await deleteDoc(doc(db, 'jogos', id));
        this.atualizar();
      },
      editar: function(id) {
        const jogo = this.lista.find( (item) => item.id == id );
        this.jogo = { ...jogo };
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

