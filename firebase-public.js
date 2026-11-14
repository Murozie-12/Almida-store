import {firebaseConfig,configured} from './firebase-config.js';
if(configured){
  try{
    const [{initializeApp},{getFirestore,doc,onSnapshot}] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js')
    ]);
    const db=getFirestore(initializeApp(firebaseConfig));
    onSnapshot(doc(db,'catalog','published'),snapshot=>{
      if(snapshot.exists() && Array.isArray(snapshot.data().items)){
        window.almidaUpdateCatalog(snapshot.data().items);
        console.info('Katalog ALMIDA STORE diperbarui dari Firebase');
      }
    },err=>console.error('Gagal membaca katalog Firebase:',err));
  }catch(err){console.error('Firebase tidak terhubung, memakai katalog bawaan:',err)}
}
