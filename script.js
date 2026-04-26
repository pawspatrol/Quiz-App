// THE DATA (100 Questions)
const bibleQuestions = [
  { question: "What Babylonian name was given to Daniel by the prince of the eunuchs?", options: ["Belteshazzar", "Belshazzar", "Abednego", "Beltheshar"], answer: "Belteshazzar" },
  { question: "Which prophet was forbidden to mourn aloud when his wife died, as a sign to Israel?", options: ["Ezekiel", "Hosea", "Jeremiah", "Isaiah"], answer: "Ezekiel" },
  { question: "Who was king of Salem and priest of the Most High God who blessed Abraham?", options: ["Melchizedek", "Adoni-zedek", "Abimelech", "Bera"], answer: "Melchizedek" },
  { question: "How many Philistines did Shamgar slay with an ox goad?", options: ["Six hundred", "Three hundred", "One thousand", "Eleven hundred"], answer: "Six hundred" },
  { question: "Which left-handed judge slew Eglon king of Moab with a hidden dagger?", options: ["Ehud", "Othniel", "Shamgar", "Gideon"], answer: "Ehud" },
  { question: "What was the name of the unfaithful wife the prophet Hosea was commanded to take?", options: ["Gomer", "Diblaim", "Bilhah", "Tamar"], answer: "Gomer" },
  { question: "Which cupbearer to King Artaxerxes returned to rebuild Jerusalem's walls?", options: ["Nehemiah", "Ezra", "Zerubbabel", "Mordecai"], answer: "Nehemiah" },
  { question: "By which brook did Elijah hide and was fed by ravens during the famine?", options: ["Cherith", "Kidron", "Jabbok", "Kishon"], answer: "Cherith" },
  { question: "How many prophets of Baal did Elijah confront on Mount Carmel?", options: ["Four hundred and fifty", "Four hundred", "Eight hundred and fifty", "Nine hundred"], answer: "Four hundred and fifty" },
  { question: "In what city was Cornelius the centurion stationed when Peter was sent to him?", options: ["Caesarea", "Joppa", "Damascus", "Antioch"], answer: "Caesarea" },
  { question: "Which prophet's scroll was the Ethiopian eunuch reading when Philip met him?", options: ["Isaiah", "Jeremiah", "Daniel", "The Psalms"], answer: "Isaiah" },
  { question: "What was the name given to the field bought with Judas Iscariot's thirty pieces of silver?", options: ["Akeldama", "Gehenna", "Tophet", "Gethsemane"], answer: "Akeldama" },
  { question: "In which city did Paul reason with the philosophers on Mars' Hill?", options: ["Athens", "Corinth", "Ephesus", "Berea"], answer: "Athens" },
  { question: "Which silversmith stirred up a riot against Paul over the goddess Diana?", options: ["Demetrius", "Alexander", "Tertullus", "Sosthenes"], answer: "Demetrius" },
  { question: "Which disciple did Peter raise from the dead in Joppa?", options: ["Tabitha (Dorcas)", "Eutychus", "Lydia", "Mary of Cleophas"], answer: "Tabitha (Dorcas)" },
  { question: "Who was the first of the twelve apostles to be martyred?", options: ["James the son of Zebedee", "Stephen", "Peter", "James the Lord's brother"], answer: "James the son of Zebedee" },
  { question: "From what city was Lydia, the seller of purple, in Philippi?", options: ["Thyatira", "Philippi", "Smyrna", "Laodicea"], answer: "Thyatira" },
  { question: "Who was compelled to bear the cross of Jesus on the way to Golgotha?", options: ["Simon of Cyrene", "Simon the Zealot", "Simon Peter", "Simon the Leper"], answer: "Simon of Cyrene" },
  { question: "What were the names of the two sons of Simon of Cyrene?", options: ["Alexander and Rufus", "Andrew and Philip", "Cleopas and Clopas", "Lucius and Niger"], answer: "Alexander and Rufus" },
  { question: "Of the ten lepers Jesus cleansed, how many returned to give thanks?", options: ["One, a Samaritan", "Two", "Three", "None"], answer: "One, a Samaritan" },
  { question: "Which aged prophetess gave thanks in the temple at the presentation of Jesus?", options: ["Anna", "Elisabeth", "Hannah", "Huldah"], answer: "Anna" },
  { question: "Of which tribe of Israel was the prophetess Anna?", options: ["Asher", "Judah", "Levi", "Benjamin"], answer: "Asher" },
  { question: "Which archangel contended with the devil over the body of Moses?", options: ["Michael", "Gabriel", "Raphael", "Uriel"], answer: "Michael" },
  { question: "Who was captain of King David's host for most of his reign?", options: ["Joab", "Benaiah", "Abner", "Ittai"], answer: "Joab" },
  { question: "Whom did Solomon set over his army in the place of Joab?", options: ["Benaiah", "Adonijah", "Zadok", "Abishai"], answer: "Benaiah" },
  { question: "How many wives and concubines did Solomon have?", options: ["700 wives, 300 concubines", "300 wives, 700 concubines", "500 wives, 300 concubines", "1000 total"], answer: "700 wives, 300 concubines" },
  { question: "Which prophet tore his new garment into twelve pieces?", options: ["Ahijah", "Shemaiah", "Iddo", "Nathan"], answer: "Ahijah" },
  { question: "From which tribe was Saul, the first king of Israel?", options: ["Benjamin", "Judah", "Ephraim", "Manasseh"], answer: "Benjamin" },
  { question: "Which queen of Judah destroyed all the seed royal?", options: ["Athaliah", "Jezebel", "Maacah", "Bathsheba"], answer: "Athaliah" },
  { question: "Who hid the infant king Joash in the temple for six years?", options: ["Jehosheba", "Huldah", "Jehoaddan", "Zibiah"], answer: "Jehosheba" },
  { question: "How many years in total did Jacob serve Laban for Leah and Rachel?", options: ["Fourteen", "Seven", "Twenty-one", "Twelve"], answer: "Fourteen" },
  { question: "When Aaron's rod budded, what did it bring forth?", options: ["Almonds", "Figs", "Olives", "Pomegranates"], answer: "Almonds" },
  { question: "Which two sons of Aaron were consumed by fire for offering strange fire?", options: ["Nadab and Abihu", "Eleazar and Ithamar", "Hophni and Phinehas", "Korah and Dathan"], answer: "Nadab and Abihu" },
  { question: "How many sons of Sceva attempted to cast out an evil spirit?", options: ["Seven", "Three", "Five", "Twelve"], answer: "Seven" },
  { question: "Before which Roman governor did Paul appeal to Caesar?", options: ["Festus", "Felix", "Pilate", "Gallio"], answer: "Festus" },
  { question: "Which son of David declared himself king while David was alive?", options: ["Absalom", "Adonijah", "Solomon", "Amnon"], answer: "Adonijah" },
  { question: "Who was struck with leprosy for burning incense in the temple?", options: ["Uzziah", "Ahaz", "Jotham", "Hezekiah"], answer: "Uzziah" },
  { question: "Which king of Judah began to reign at age eight?", options: ["Josiah", "Joash", "Manasseh", "Hezekiah"], answer: "Josiah" },
  { question: "Which prophet confronted David over Bathsheba?", options: ["Nathan", "Samuel", "Gad", "Elijah"], answer: "Nathan" },
  { question: "Who fell from a third-story window while Paul was preaching?", options: ["Eutychus", "Tychicus", "Silas", "Timothy"], answer: "Eutychus" },
  { question: "Who was chosen by lot to replace Judas Iscariot?", options: ["Matthias", "Barnabas", "Stephen", "Philip"], answer: "Matthias" },
  { question: "In which city was the apostle Paul born?", options: ["Antioch", "Tarsus", "Damascus", "Jerusalem"], answer: "Tarsus" },
  { question: "On which island was Paul shipwrecked?", options: ["Crete", "Cyprus", "Malta", "Patmos"], answer: "Malta" },
  { question: "Which figure walked with God and 'was not, for God took him'?", options: ["Enoch", "Noah", "Methuselah", "Lamech"], answer: "Enoch" },
  { question: "Who appeared with Jesus on the Mount of Transfiguration?", options: ["Elijah and Moses", "Elijah and Isaiah", "Moses and Abraham", "David and Elijah"], answer: "Elijah and Moses" },
  { question: "Which judge slew a thousand Philistines with a jawbone?", options: ["Samson", "Gideon", "Jephthah", "Ehud"], answer: "Samson" },
  { question: "Which disciple confessed 'My Lord and my God'?", options: ["Thomas", "Peter", "John", "James"], answer: "Thomas" },
  { question: "Who was the first Christian martyr?", options: ["Stephen", "James", "Peter", "Paul"], answer: "Stephen" },
  { question: "Who was Paul's first missionary partner?", options: ["Barnabas", "Silas", "Timothy", "Luke"], answer: "Barnabas" },
  { question: "Who were struck dead for lying to the Holy Spirit?", options: ["Ananias and Sapphira", "Ananias only", "Sapphira only", "Simon and Sapphira"], answer: "Ananias and Sapphira" },
  { question: "Which two high priests are named in the trial of Jesus?", options: ["Annas and Caiaphas", "Annas and Eleazar", "Caiaphas and Theophilus", "Caiaphas and Ananias"], answer: "Annas and Caiaphas" },
  { question: "For how many pieces of silver was Joseph sold?", options: ["Twenty", "Thirty", "Fifty", "Seventy"], answer: "Twenty" },
  { question: "Who fashioned the golden calf at Mount Sinai?", options: ["Aaron", "Hur", "Joshua", "Caleb"], answer: "Aaron" },
  { question: "With whom did Jacob wrestle until daybreak?", options: ["A man (God)", "Esau", "An Egyptian", "An angel"], answer: "A man (God)" },
  { question: "What did Jacob see in his dream at Bethel?", options: ["A ladder to heaven", "A burning altar", "A sealed scroll", "A field of wheat"], answer: "A ladder to heaven" },
  { question: "Which disciple was a tax collector?", options: ["Matthew", "Peter", "Philip", "James"], answer: "Matthew" },
  { question: "Who was the disciple Jesus loved?", options: ["John", "Peter", "James", "Andrew"], answer: "John" },
  { question: "How was Elijah taken up into heaven?", options: ["Chariot of fire", "In a cloud", "By angels", "Vision of light"], answer: "Chariot of fire" },
  { question: "Who was Elisha's prophetic mentor?", options: ["Elijah", "Samuel", "Isaiah", "Nathan"], answer: "Elijah" },
  { question: "Which apostle was exiled to Patmos?", options: ["John", "Peter", "Paul", "James"], answer: "John" },
  { question: "What was the name of Moses' wife?", options: ["Zipporah", "Miriam", "Asenath", "Keturah"], answer: "Zipporah" },
  { question: "Who was the father-in-law of Moses?", options: ["Jethro", "Hobab", "Laban", "Jesse"], answer: "Jethro" },
  { question: "Who was the priestly father of John the Baptist?", options: ["Zacharias", "Eli", "Joachim", "Zechariah"], answer: "Zacharias" },
  { question: "Of which priestly course was Zacharias?", options: ["Abia", "Aaron", "Eleazar", "Jeshua"], answer: "Abia" },
  { question: "Which two wicked sons of Eli the priest died on the same day?", options: ["Hophni and Phinehas", "Nadab and Abihu", "Joel and Abiah", "Mahlon and Chilion"], answer: "Hophni and Phinehas" },
  { question: "Where did King Saul consult a woman with a familiar spirit?", options: ["Endor", "Shiloh", "Gilgal", "Beersheba"], answer: "Endor" },
  { question: "Where had Saul hidden himself when Samuel sought to make him king?", options: ["Among the baggage", "In a cave", "In his house", "In a field"], answer: "Among the baggage" },
  { question: "Who was the mother of Samuel the prophet?", options: ["Hannah", "Peninnah", "Elisheba", "Jochebed"], answer: "Hannah" },
  { question: "Which king of Judah tore his clothes when the book of the law was read?", options: ["Josiah", "Hezekiah", "Manasseh", "Jehoshaphat"], answer: "Josiah" },
  { question: "Which prophetess did King Josiah consult?", options: ["Huldah", "Deborah", "Miriam", "Anna"], answer: "Huldah" },
  { question: "Which king of Babylon saw the handwriting on the wall?", options: ["Belshazzar", "Nebuchadnezzar", "Darius", "Evil-merodach"], answer: "Belshazzar" },
  { question: "Which Persian king took Esther as his queen?", options: ["Ahasuerus", "Cyrus", "Artaxerxes", "Darius"], answer: "Ahasuerus" },
  { question: "Who was Esther's cousin who raised her?", options: ["Mordecai", "Hegai", "Memucan", "Bigthan"], answer: "Mordecai" },
  { question: "Which Agagite official sought to destroy all the Jews in Persia?", options: ["Haman", "Hegai", "Memucan", "Bigthan"], answer: "Haman" },
  { question: "How many provinces did King Ahasuerus rule?", options: ["127", "120", "70", "12"], answer: "127" },
  { question: "In what palace city of Persia did Queen Esther reside?", options: ["Shushan", "Babylon", "Ecbatana", "Persepolis"], answer: "Shushan" },
  { question: "How many souls were saved in Noah's ark?", options: ["Eight", "Six", "Ten", "Twelve"], answer: "Eight" },
  { question: "To what land did Cain go after slaying Abel?", options: ["Nod", "Shinar", "Havilah", "Cush"], answer: "Nod" },
  { question: "From what city did the LORD call Abram?", options: ["Ur", "Haran", "Salem", "Beersheba"], answer: "Ur" },
  { question: "What was the name of Joseph's Egyptian wife?", options: ["Asenath", "Zipporah", "Bithiah", "Tahpenes"], answer: "Asenath" },
  { question: "Which of Joseph's brothers did he keep in Egypt as surety?", options: ["Simeon", "Reuben", "Judah", "Benjamin"], answer: "Simeon" },
  { question: "On which mountain did Moses die?", options: ["Mount Nebo", "Mount Hor", "Mount Sinai", "Mount Carmel"], answer: "Mount Nebo" },
  { question: "How old was Moses when he died?", options: ["120", "100", "80", "110"], answer: "120" },
  { question: "Which judge made a rash vow that cost him his daughter?", options: ["Jephthah", "Gideon", "Samson", "Abimelech"], answer: "Jephthah" },
  { question: "Over which city did Joshua command the sun to stand still?", options: ["Gibeon", "Ai", "Jericho", "Hebron"], answer: "Gibeon" },
  { question: "Who was the Jewess wife of Felix the Roman governor?", options: ["Drusilla", "Bernice", "Damaris", "Claudia"], answer: "Drusilla" },
  { question: "Who was the sister of King Agrippa II at Paul's hearing?", options: ["Bernice", "Drusilla", "Herodias", "Salome"], answer: "Bernice" },
  { question: "In which city was Paul stoned and dragged out as dead?", options: ["Lystra", "Iconium", "Derbe", "Antioch"], answer: "Lystra" },
  { question: "Apollos was a Jew born in what city?", options: ["Alexandria", "Antioch", "Tarsus", "Cyrene"], answer: "Alexandria" },
  { question: "Whom did Paul send back to his master Philemon?", options: ["Onesimus", "Tychicus", "Epaphras", "Silas"], answer: "Onesimus" },
  { question: "Which book closes the Old Testament canon?", options: ["Malachi", "Zechariah", "Nehemiah", "Chronicles"], answer: "Malachi" },
  { question: "How many plagues did the LORD send upon Egypt?", options: ["Ten", "Seven", "Twelve", "Forty"], answer: "Ten" },
  { question: "How many devils did Jesus cast out of Mary Magdalene?", options: ["Seven", "Three", "Twelve", "Five"], answer: "Seven" },
  { question: "In what river was Jesus baptized?", options: ["Jordan", "Kidron", "Jabbok", "Nile"], answer: "Jordan" },
  { question: "How many days did Jesus fast in the wilderness?", options: ["Forty", "Three", "Seven", "Thirty"], answer: "Forty" },
  { question: "What was the name of the high priest's servant whose ear was cut?", options: ["Malchus", "Tertius", "Secundus", "Onesiphorus"], answer: "Malchus" },
  { question: "By what pool with five porches did Jesus heal an infirm man?", options: ["Bethesda", "Siloam", "Gihon", "En-rogel"], answer: "Bethesda" },
  { question: "To what pool did Jesus send the man born blind to wash?", options: ["Siloam", "Bethesda", "Gihon", "Jordan"], answer: "Siloam" },
  { question: "How many great fishes did the disciples draw in the net?", options: ["153", "500", "70", "12"], answer: "153" },
  { question: "How many souls were added on the day of Pentecost?", options: ["3000", "5000", "120", "7000"], answer: "3000" }
];

let currentIdx = 0;
let score = 0;
let userSelections = [];
let timeLeft = 30 * 60;

// The "Magic" Shuffler (Fisher-Yates Algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  // 1. Randomize the questions before starting
  shuffleArray(bibleQuestions);
  
  // 2. Clear old answers
  userSelections = new Array(bibleQuestions.length).fill(null);
  score = 0;
  currentIdx = 0;

  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('quiz-screen').classList.remove('hidden');
  
  buildNav();
  renderQuestion();
  startTimer();
}

function buildNav() {
  const nav = document.getElementById('question-nav');
  nav.innerHTML = '';
  bibleQuestions.forEach((_, i) => {
    const item = document.createElement('div');
    item.className = 'nav-item';
    item.innerText = i + 1;
    item.id = `nav-${i}`;
    item.onclick = () => { currentIdx = i; renderQuestion(); };
    nav.appendChild(item);
  });
}

function renderQuestion() {
  const q = bibleQuestions[currentIdx];
  document.getElementById('progress').innerText = `QUESTION ${currentIdx + 1} OF 100`;
  document.getElementById('question-body').innerText = q.question;
  
  const container = document.getElementById('options-container');
  container.innerHTML = '';
  
  q.options.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'option';
    if (userSelections[currentIdx] !== null) {
      div.classList.add('disabled');
      if (opt === q.answer) div.classList.add('correct');
      if (userSelections[currentIdx] === opt && opt !== q.answer) div.classList.add('wrong');
    }
    div.innerHTML = `<div class="option-letter">${String.fromCharCode(65+i)}</div><span>${opt}</span>`;
    div.onclick = () => {
      if (userSelections[currentIdx] === null) {
        userSelections[currentIdx] = opt;
        if (opt === q.answer) score++;
        document.getElementById(`nav-${currentIdx}`).classList.add('answered');
        renderQuestion();
      }
    };
    container.appendChild(div);
  });

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`nav-${currentIdx}`).classList.add('active');
}

function changeQuestion(step) {
  currentIdx = Math.max(0, Math.min(bibleQuestions.length - 1, currentIdx + step));
  renderQuestion();
}

function startTimer() {
  const display = document.getElementById('timer');
  const timerInterval = setInterval(() => {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    display.innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResults();
    }
    timeLeft--;
  }, 1000);
}

function showResults() {
  document.getElementById('quiz-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  document.getElementById('final-score').innerText = `${score}/100`;
  
  const percent = (score / bibleQuestions.length) * 100;
  document.getElementById('feedback-text').innerText = percent >= 70 ? 
    "Excellent! Your knowledge is profound." : "Keep studying the scriptures daily.";
    }
  
