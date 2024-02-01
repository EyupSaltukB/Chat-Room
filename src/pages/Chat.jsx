// collection eklemek için collection fonks. import edildi.
import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy } from "firebase/firestore";
// collection datası alma
import { auth, db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const Chat = ({ room, setRoom }) => {
    const [messages, setMessages] = useState([]);

    // collection'ın referansını alma
    // collection ve içinde bağlı olduğu data ile collection
    // parçasını ekle ve değişkene ata
    const messagesCol = collection(db, "messages");
    console.log(auth)

    // formun gönderilme olayını izleme
    // döküman fonksiyonun async olmasını istiyor
    // çünkü server'dan bilgilerin gelmesi zaman almaktadır.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target[0].value;

        // collection'a eleman eklemek istiyorsak
        // yeni document(message) ekleme
        await addDoc(messagesCol, {
            text,
            room,
            user: {
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL,
                uid: auth.currentUser.uid
            },
            createdAt: serverTimestamp()
        })
    }

    useEffect(() => {
        // filtreleme ayarları tanımlama
        const queryOptions = query(messagesCol, 
            where("room", "==", room), 
            orderBy("createdAt", "asc", ))
        // collection'daki değişimi izleyip
        // her değişimde fonks. çalıştırır ve fonksiyona
        // veri tabanının güncel verilerini aktarır.
        // onSnapshot : belirli aralıklarla collection'ı kaydeder.
        // eğer ekran görüntüleri arasında değişiklik olursa
        // fonks. çalıştırır ve güncel hâlini ekrana yansıtır.
        const unsubscribe = onSnapshot(queryOptions, (snapshot) => {
            const comingMessages = [];

            // döküman içerisindeki verilere erişip diziye aktarma
            snapshot.docs.forEach((doc) => 
            //mesaj içeriği ve doc.id verildi
            comingMessages.push({...doc.data(), id: doc.id}))


            setMessages(comingMessages);
        });

        return () => {
            // collection'ı bileşenden çıkınca izlemeyi durdurur.
            unsubscribe();
        }
    }, [])

    console.log("ds",messages)

    return (
        <div className='chat'>
            <header>
                <p className='user'>Kullanıcı Adı</p>
                <p>{room}</p>
                <a onClick={() => setRoom(null)}>Başka Oda</a>
            </header>

            <main>
                {messages.map((msg) => (
                <Message key={msg.id} msg={msg}/>
                ))}
            </main>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Mesajınızı yazın...' />
                <button>Gönder</button>
            </form>
        </div>
    )
}

export default Chat;