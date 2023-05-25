/*fetch('https://sozluk.gov.tr/atasozu')
.then(gelen => gelen.json())
.then(veri => console.log(veri)) */

let sonuc = document.getElementById("sonuc");
let aramaKutusu = document.getElementById("aramaKutusu");
let aramaListesi = document.getElementById("aramaListesi");

//JSON KAYNAĞINDAN ALDIĞIMIZ VERİLERİ SAYFADA TUTMAK İÇİN DİZİ DEĞİŞKENLERİ OLUŞTURALIM
let anahtarKelimeler = [];
let deyimlerSozler = [];

//Başka bi yol
verileriYukle();
async function verileriYukle() {
  const sunucuYaniti = await fetch("https://sozluk.gov.tr/atasozu");
  const veriler = await sunucuYaniti.json();
  //console.log(veriler)
  veriler.forEach((eleman) => {
    anahtarKelimeler.push(eleman.anahtar); //boş olan anahtarKelimeler adlı dizinin içine json dosyamızda bulunan anahtar değerini alıp ekliyoruz
    deyimlerSozler.push(eleman.sozum);
  });
  // console.log(deyimlerSozler)
  const birlesmisKelimeler = [...new Set(anahtarKelimeler)]; //aynı anahtar kelimeyi içerdiği için bu şekilde başka bir değişkene aktarıp kopyaladık
  console.log(birlesmisKelimeler);

  // burda ise hem forEach ile anahtar kelimelerimizi birbirinden bağımsız hale getirdik hemde oluşturduğumuz option ile aramaListesine eklemiş olduk
  birlesmisKelimeler.sort(() => Math.random() - 0.5); //anahtarKelimeleri sayfa her yenilendiğinde random üretmek için
  let sayac = 0;
  birlesmisKelimeler.forEach((kelime) => {
    if (sayac < 5) {
      const yeniOneri = document.createElement("option");
      aramaListesi.appendChild(yeniOneri);
      yeniOneri.value = kelime;
    }
    sayac++;
    // sayac ile aramListesinde gözükücek anahtarKelimeleri if ile 5 adet gözükücek şekilde  sınırlı kıldık.
  });
}

aramaKutusu.addEventListener("input", (e) => sonuclariFiltrele(e.target.value));
function sonuclariFiltrele(arananKelime) {
  sonuc.innerHTML = "";
  const aramaKriteri = new RegExp(arananKelime, "gi");
  let eslesenler = deyimlerSozler.filter((soz) => aramaKriteri.test(soz));

  let moveContainer = document.getElementById("container");

  moveContainer.style.right = "0";
  moveContainer.style.top = "0";
  moveContainer.style.width = "220px";
  aramaKutusu.style.marginLeft = "15px";
  moveContainer.style.transition = "500ms";


  //console.log(eslesenler)

  /*
    if (arananKelime ==="") {
    eslesenler = []}
   BİR KELİME ARANDIĞINDA İNPUT TEMİZLENİNCE SAYFA DA BÜTÜN VERİLER HATA OLARAK 
   DURUYORDU. BU ŞEKİLDE OLMAMASI İÇİN BOŞSA İNPUT DİZİYİ BOŞALT DEMİŞ OLDUK.
   AYRICA AŞAĞIDA Kİ GİBİ DE YAPILABİLİR
    */
  if (arananKelime.length < 2) {
    eslesenler = [];
  }

  //burda sonucları listeye ekledik
  eslesenler.forEach((es) => {
    const sonucLi = document.createElement("li");
    sonuc.appendChild(sonucLi);
    sonucLi.innerHTML = es;
  });
}
