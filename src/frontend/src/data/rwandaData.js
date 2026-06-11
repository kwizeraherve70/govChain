// Rwanda administrative divisions: Province → District → Sectors
const RWANDA = {
  Kigali: {
    Gasabo: [
      'Bumbogo', 'Gatsata', 'Gikomero', 'Gisozi', 'Jabana', 'Jali',
      'Kacyiru', 'Kimihurura', 'Kimironko', 'Kinyinya', 'Ndera', 'Nduba',
      'Remera', 'Rusororo', 'Rutunga',
    ],
    Kicukiro: [
      'Gahanga', 'Gatenga', 'Gikondo', 'Kagarama', 'Kanombe', 'Kicukiro',
      'Kigarama', 'Masaka', 'Niboye', 'Nyarugunga',
    ],
    Nyarugenge: [
      'Gitega', 'Kanyinya', 'Kigali', 'Kimisagara', 'Mageragere', 'Muhima',
      'Nyakabanda', 'Nyamirambo', 'Nyarugenge', 'Rwezamenyo',
    ],
  },
  Northern: {
    Burera: [
      'Bungwe', 'Butaro', 'Cyanika', 'Cyeru', 'Gahunga', 'Gatebe', 'Gitovu',
      'Kagogo', 'Kinoni', 'Kinyababa', 'Kivuye', 'Nemba', 'Rugarama',
      'Rugendabari', 'Ruhunde', 'Rusarabuye', 'Rwerere',
    ],
    Gakenke: [
      'Busengo', 'Coko', 'Cyabingo', 'Gakenke', 'Gashenyi', 'Janja',
      'Kamubuga', 'Karambo', 'Kivuruga', 'Mataba', 'Minazi', 'Mugunga',
      'Muhondo', 'Muyongwe', 'Muzo', 'Nemba', 'Ruli', 'Rusasa', 'Rushashi',
    ],
    Gicumbi: [
      'Bukure', 'Bwisige', 'Byumba', 'Cyumba', 'Giti', 'Kageyo', 'Kaniga',
      'Manyagiro', 'Miyove', 'Mukarange', 'Muko', 'Mutete', 'Nyamiyaga',
      'Nyankenke', 'Rubaya', 'Rukomo', 'Rushaki', 'Rutare', 'Ruvune',
      'Rwamiko', 'Shangasha',
    ],
    Musanze: [
      'Busogo', 'Cyuve', 'Gacaca', 'Gashaki', 'Gataraga', 'Kimonyi',
      'Kinigi', 'Muhoza', 'Muko', 'Musanze', 'Nkotsi', 'Nyange', 'Remera',
      'Rwaza', 'Shingiro',
    ],
    Rulindo: [
      'Base', 'Burega', 'Bushoki', 'Buyoga', 'Cyinzuzi', 'Cyungo', 'Kinihira',
      'Kisaro', 'Masoro', 'Mbogo', 'Murambi', 'Ngoma', 'Ntarabana', 'Rukozo',
      'Rusiga', 'Shyorongi', 'Tumba',
    ],
  },
  Southern: {
    Gisagara: [
      'Gikonko', 'Gishubi', 'Kansi', 'Kibilizi', 'Kigembe', 'Mamba',
      'Muganza', 'Mugombwa', 'Mukindo', 'Musha', 'Ndora', 'Nyanza', 'Save',
    ],
    Huye: [
      'Gishamvu', 'Huye', 'Karama', 'Kigoma', 'Kinazi', 'Maraba', 'Mbazi',
      'Mukura', 'Ngoma', 'Ruhashya', 'Rusatira', 'Rwaniro', 'Simbi', 'Tumba',
    ],
    Kamonyi: [
      'Gacurabwenge', 'Kamonyi', 'Kayenzi', 'Kayumbu', 'Mugina', 'Musambira',
      'Ngamba', 'Nyamiyaga', 'Nyarubaka', 'Rugarika', 'Rukoma', 'Runda',
    ],
    Muhanga: [
      'Cyeza', 'Kabacuzi', 'Kibangu', 'Kiyumba', 'Muhanga', 'Mushishiro',
      'Nyabinoni', 'Nyamabuye', 'Nyarusange', 'Rongi', 'Rugendabari', 'Shyogwe',
    ],
    Nyamagabe: [
      'Buruhukiro', 'Cyanika', 'Gasaka', 'Gatare', 'Kaduha', 'Kamegeri',
      'Kibirizi', 'Kibumbwe', 'Kitabi', 'Mbazi', 'Mugano', 'Musange',
      'Musebeya', 'Mushubi', 'Nkomane', 'Tare', 'Uwamareba',
    ],
    Nyanza: [
      'Busasamana', 'Cyabakamyi', 'Kibirizi', 'Kigoma', 'Mukingo', 'Muyira',
      'Ntyazo', 'Nyagisozi', 'Rwabicuma',
    ],
    Nyaruguru: [
      'Cyahinda', 'Kibeho', 'Kivu', 'Mata', 'Muganza', 'Munini', 'Ngera',
      'Ngoma', 'Nyabimata', 'Nyagisozi', 'Ruheru', 'Ruramba', 'Rusenge',
    ],
    Ruhango: [
      'Bweramana', 'Byimana', 'Kabagari', 'Kinazi', 'Kinihira', 'Mbuye',
      'Mwendo', 'Ntongwe', 'Ruhango',
    ],
  },
  Eastern: {
    Bugesera: [
      'Gashora', 'Juru', 'Kamabuye', 'Mareba', 'Mayange', 'Musenyi',
      'Mwogo', 'Ngeruka', 'Ntarama', 'Nyamata', 'Nyarugenge', 'Rilima',
      'Ruhuha', 'Rweru', 'Shyara',
    ],
    Gatsibo: [
      'Gasange', 'Gatsibo', 'Gitoki', 'Kabarore', 'Kageyo', 'Kiramuruzi',
      'Kiziguro', 'Muhura', 'Murambi', 'Ngarama', 'Nyagihanga', 'Remera',
      'Rugarama', 'Rwimbogo',
    ],
    Kayonza: [
      'Gahini', 'Kabare', 'Kabarore', 'Kagina', 'Karama', 'Mukarange',
      'Murama', 'Murundi', 'Mwiri', 'Ndego', 'Nyamirama', 'Rukara',
      'Ruramira', 'Rwinkwavu',
    ],
    Kirehe: [
      'Gahara', 'Gatore', 'Kigarama', 'Kigina', 'Kirehe', 'Mahama',
      'Mpanga', 'Musaza', 'Mushikiri', 'Nasho', 'Nyamugari', 'Nyarubuye',
    ],
    Ngoma: [
      'Gashanda', 'Jarama', 'Karembo', 'Kazo', 'Kibungo', 'Mugesera',
      'Murama', 'Mutenderi', 'Remera', 'Rukira', 'Rukumberi', 'Rurenge',
      'Sake', 'Zaza',
    ],
    Nyagatare: [
      'Gatunda', 'Karama', 'Karangazi', 'Katabagemu', 'Kazo', 'Mimuli',
      'Mukama', 'Musheli', 'Nyagatare', 'Rukomo', 'Rwempasha', 'Rwimiyaga',
      'Tabagwe',
    ],
    Rwamagana: [
      'Fumbwe', 'Gahengeri', 'Gishari', 'Karenge', 'Kigabiro', 'Muhazi',
      'Munyaga', 'Munyiginya', 'Musha', 'Muyumbu', 'Mwulire', 'Nyakariro',
      'Nzige', 'Rubona',
    ],
  },
  Western: {
    Karongi: [
      'Bwishyura', 'Gashari', 'Gishyita', 'Gitesi', 'Mubuga', 'Murambi',
      'Murundi', 'Mutuntu', 'Rubengera', 'Rugabano', 'Ruganda', 'Rwankuba',
      'Twumba',
    ],
    Ngororero: [
      'Bwira', 'Gatumba', 'Hindiro', 'Kabaya', 'Kageyo', 'Kavumu',
      'Matyazo', 'Muhanda', 'Muhororo', 'Ndaro', 'Ngororero', 'Nyange', 'Sovu',
    ],
    Nyabihu: [
      'Bigogwe', 'Jenda', 'Jomba', 'Kabatwa', 'Karago', 'Kintobo',
      'Mukamira', 'Muringa', 'Rambura', 'Rugera', 'Rurembo', 'Shyira',
    ],
    Nyamasheke: [
      'Bushekeri', 'Bushenge', 'Cyato', 'Gihombo', 'Kagano', 'Kanjongo',
      'Karambi', 'Karengera', 'Kirimbi', 'Macuba', 'Mahembe', 'Nyabitekeri',
      'Rangiro', 'Ruharambuga', 'Shangi',
    ],
    Rubavu: [
      'Bugeshi', 'Bugoyi', 'Cyanzarwe', 'Gisenyi', 'Kanama', 'Kanzenze',
      'Mudende', 'Nyamyumba', 'Nyundo', 'Rubavu', 'Rugerero',
    ],
    Rutsiro: [
      'Boneza', 'Gihango', 'Kigeyo', 'Kivumu', 'Manihira', 'Mukura',
      'Murunda', 'Musasa', 'Mushonyi', 'Mushubati', 'Nyabirasi', 'Ruhango',
      'Rusebeya',
    ],
    Rusizi: [
      'Bugarama', 'Butare', 'Bweyeye', 'Gashonga', 'Giheke', 'Gihundwe',
      'Gitambi', 'Kamembe', 'Muganza', 'Mururu', 'Nkungu', 'Nyakabuye',
      'Nyakarenzo', 'Nzahaha', 'Rwimbogo',
    ],
  },
};

export const PROVINCES = Object.keys(RWANDA);

export const getDistricts = (province) =>
  Object.keys(RWANDA[province] || {});

export const getSectors = (province, district) =>
  RWANDA[province]?.[district] || [];
