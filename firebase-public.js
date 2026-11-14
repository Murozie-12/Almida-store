import {firebaseConfig,configured} from './firebase-config.js';
if(configured){
 try {
  const [{initializeApp},{getFirestore,doc,getDoc,onSnapshot}]=await Promise.all([
   import('https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js'),
   import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js')]);
  const db=getFirestore(initializeApp(firebaseConfig));
  let generation=0;
  let v3Active=false;
  onSnapshot(doc(db,'catalog_v3_public','manifest'),async snap=>{
   const current=++generation;
   if(!snap.exists()||!snap.data().active)return;
   try {
    const m=snap.data(),ids=m.chunks;
    if(!Array.isArray(ids)||!ids.length||ids.length>100||!ids.every(x=>typeof x==='string'&&/^[a-zA-Z0-9_-]+$/.test(x)))throw Error('Manifest tidak valid');
    const parts=await Promise.all(ids.map(id=>getDoc(doc(db,'catalog_v3_public',id))));
    if(current!==generation)return;
    if(parts.some(s=>!s.exists()||!Array.isArray(s.data().items)))throw Error('Chunk katalog tidak lengkap');
    const items=parts.flatMap(s=>s.data().items);
    if(items.length!==m.count)throw Error('Jumlah produk tidak sesuai manifest');
    if(typeof window.almidaUpdateCatalog!=='function')throw Error('Website belum siap');
    v3Active=true;
    window.almidaUpdateCatalog(items);
    console.info('ALMIDA V3 aktif:',items.length,'produk');
   }catch(e){console.error('Gagal memuat V3; katalog V2 tetap dipakai:',e)}
  },e=>console.error('Manifest V3 tidak dapat dibaca:',e));
  // V2 tetap menjadi fallback. Jangan menimpa katalog V3 yang berhasil dimuat.
  onSnapshot(doc(db,'catalog','published'),s=>{
   if(s.exists()&&Array.isArray(s.data().items)&&!v3Active)window.almidaUpdateCatalog(s.data().items);
  },e=>console.error('Fallback V2 gagal:',e));
 }catch(e){console.error('Firebase tidak tersedia:',e)}
}
