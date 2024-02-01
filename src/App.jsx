import { useEffect, useState } from "react"
import AuthPage from "./pages/AuthPage"
import { auth } from "./firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import Chat from "./pages/Chat";

// console.log(auth) => firebase'in arka planda çalışan gereksinimleri 
// örn. currentUser : kullanıcı bilgileri
function App() {
  const [isAuth, setIsAuth] = useState();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    // onAuthStateChanged: auth objesini ve fonksiyonu alır,
    // kullanıcının her yaptığı değişiklikte çalışır...
    onAuthStateChanged( auth, (user) => {
      if(user){
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    })
  }, [])

  // formun gönderilme olayı
  const handleSubmit = (e) => {
    e.preventDefault();
    setRoom(e.target[0].value);
  }

  // aktif kullanıcı yok ise giriş sayfası açılsın
  if(isAuth === false) {
    return (
      <div className="container">
     <AuthPage/>
    </div>
    )
  }

  // * aktif kullanıcı var ise chat açılsın
  return (
    <div className="container">
      {/* eğer kullanıcı odayı belirlediyse sohbet odasına git */}
     {
      room ? (<Chat room={room} setRoom={setRoom} />) : (
        /* henüz belirlemediyse oda seçme formunu ekrana yansıt */ 
        <form onSubmit={handleSubmit} className="room-page">
      <h1>Chat Room</h1>
      <p>Hangi Odaya Girmek İstiyorsunuz?</p>
      <input type="text" placeholder="örn. Aile Grubu" required/>
      <button className="submit">Giriş Yap</button>
      <button className="button">Çıkış Yap</button>
     </form>
      )
     }
    </div>
  )
}

export default App;